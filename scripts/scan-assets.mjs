/**
 * This script is inteneded to be used via yarn script command: 'update-game-assets'.
 *
 * It's usage would be from within yarn:
 *   yarn update-game-assets C:\path\to\Ue4Export\export
 *
 * This script will attempt to update all of the web app assets related to the game from what was extracted with the
 * `UE4ExportFiles` directory.  So this game expects you to have followed the export instructions in the readme, as
 * well as, execute the export.bat.
 *
 * This script will attempt to prune any extra assets as well as find all new ones, and assets that changed.  It uses the json
 * file to figure out what assets are suppose to be in the game assets folder from this app.
 *
 * @module
 */
import { readdir, readFile, stat, copyFile, rm, realpath, chmod } from 'node:fs/promises';
import * as path from 'node:path';
/**
 * An Item row is 1 row within one of the D_Item*.json files extracted from the data.pak file.
 *
 * @typedef ItemRow
 * @type {object}
 * @property {string} Name
 * @property {string|undefined} Icon
 */
/**
 * Itemables represents the parsed D_Item*.json file from the data.pak file.
 * @typedef Itemables
 * @type {object}
 * @property {ItemRow[]} Rows
 */
/**
 * ParsedAsset represents the meta information about the parsing and extraction of each of the assets.
 *
 * @typedef ParsedAsset
 * @type {object}
 * @property {string[]} categories,
 * @property {string} name,
 * @property {string} ext,
 * @property {boolean} hasDuplicatedName,
 * @property {boolean} webLocExist,
 * @property {string} uaAssetName,
 * @property {string} uaAssetPath,
 * @property {boolean} uaAssetPathExist,
 * @property {string} fullPathName
 * @property {string|undefined} pathWebRelative
 * @property {boolean|undefined} inItemableFiles
 */

const ITEM_ICONS_UE4_EXPORT_DIR = path.join('Icarus', 'Content', 'Assets', '2DArt', 'UI', 'Items', 'Item_Icons');

/**
 * Since the stat fs function throws, but we really just want to know if the file exist or not,
 * this wraps around the stat file and just return undefined when the stat operation fail.
 *
 * @param {import('node:fs').PathLike} pathLike
 * @returns
 */
async function statOrUndefined(pathLike) {
    try {
        return await stat(pathLike);
    } catch {
        return undefined;
    }
}

/**
 * Executes {@link statOrUndefined} for each item in items, assuming a base directory of the given baseName.
 * Will return the pair of the full name generated from baseName/item for each item with its  'stat' object (or undefined).
 *
 * @param {import('node:fs').PathLike[]} items the file items to stat
 * @param {import('node:fs').PathLike} baseName the base directory of the files to stat
 * @returns {AsyncGenerator<[import('node:fs').PathLike, import('node:fs').Stats]>}
 */
async function* statFileLikeItems(items, baseName) {
    for (const item of items) {
        const fullName = path.join(baseName, item);
        yield [fullName, await statOrUndefined(fullName)];
    }
}

/**
 * Walk the directory tree with the stat of each file.
 * @param {import('node:fs').PathLike} startDir the start directory to recur down
 * @returns {AsyncGenerator<[import('node:fs').PathLike, import('node:fs').Stats]>} an async iterator of each item and stat pair
 */
async function* walk(startDir) {
    const items = await readdir(startDir);
    for await (const [item, itemStat] of statFileLikeItems(items, startDir)) {
        if (itemStat) {
            if (itemStat.isDirectory()) {
                yield* await walk(item);
            } else {
                yield [item, itemStat];
            }
        }
    }
}

/**
 * Parse out meta information about the asset file, that can be used to determine if the asset needs to be updated or not.
 *
 * @param {import('node:fs').PathLike} fullPathName the fullPath to the asset (within the webapp)
 * @param {import('node:fs').PathLike} extractedUeExportDir the directory where the assets were extracted from the game with UeExport (prior to copying to the webapp)
 * @param {boolean} webLocExist if the asset exist already in the webapp asset folder
 *
 * @returns {Promise<ParsedAsset>} a parsed out metadata for the given asset.
 */
async function pathLogic(fullPathName, extractedUeExportDir, webLocExist) {
    /**
     * @type {string[]}
     */
    const splitted = fullPathName.split(path.sep);
    const itemsIconIdx = splitted.indexOf('ItemIcons');
    if (itemsIconIdx < 0) {
        throw new Error('Can not find ItemIcons in path string, unable to parse path');
    }
    // make it relative to ItemsIcons
    splitted.splice(0, itemsIconIdx + 1);
    const categories = splitted.slice(0, splitted.length - 1);
    const parsedPath = path.parse(fullPathName);
    const parsedPathNameSplit = parsedPath.name.split('.');
    const hasDuplicatedName = parsedPathNameSplit.length === 2 && parsedPathNameSplit[0] === parsedPathNameSplit[1];
    const uaAssetName = parsedPath.base;
    const uaAssetPath = path.join(extractedUeExportDir, ITEM_ICONS_UE4_EXPORT_DIR, ...categories, uaAssetName);
    const uaAssetPathExist = !!(await statOrUndefined(uaAssetPath));
    return {
        categories,
        name: parsedPath.name,
        ext: parsedPath.ext,
        hasDuplicatedName,
        webLocExist,
        uaAssetName,
        uaAssetPath,
        uaAssetPathExist,
        fullPathName,
    };
}

/**
 * parse out the Itemables file from the extracted data into an Javascript Object
 * This assumes the JSON was encoded in UTF-8.
 *
 * @param {import('node:fs').PathLike} baseWebLoc the base directory of the web app assets (Data/D_Itemable.json exists under it)
 * @returns {Promise<Itemables>} Promise to the parsed Itemable Json.
 */
async function parseItemablesFile(baseWebLoc) {
    const itemableJsonFileName = path.join(baseWebLoc, 'Data', 'D_Itemable.json');
    return JSON.parse(await readFile(itemableJsonFileName, { encoding: 'utf-8' }));
}

/**
 * This generator iterates over each item in D_Itemable.json and outputs a parse structure for the asset.
 *
 * @param {*} baseWebLoc
 * @param {*} extractedUeExportDir
 * @param {Itemables} itemables
 */
async function* parseIcarusAssetsFromDataFile(baseWebLoc, extractedUeExportDir, itemables) {
    const baseWebItemIconsFolder = path.join(baseWebLoc, 'ItemIcons');

    // Example Icon path: /Game/Assets/2DArt/UI/Items/Item_Icons/Resources/ITEM_Fibre.ITEM_Fibre
    for (const itemable of itemables.Rows) {
        if (!itemable.Icon) {
            continue;
        }
        const splitted = itemable.Icon.split('/');
        const itemsIconIdx = splitted.indexOf('Item_Icons');
        if (itemsIconIdx < 0) {
            continue;
        }
        // make it relative to Item_Icons
        splitted.splice(0, itemsIconIdx + 1);
        const webPathName = `${path.join(baseWebItemIconsFolder, ...splitted)}.png`;

        yield await pathLogic(webPathName, extractedUeExportDir, !!statOrUndefined(webPathName));
    }
}
/**
 * This looks for assets that is under the web assets folder, that is no longer reference in the Data Json files.
 * This way we can clean up the Icons.
 *
 * @param {import('node:fs').PathLike} baseWebLoc The path to the public folder containing the web assets
 * @param {import('node:fs').PathLike} extractedUeExportDir the path to the extracted assets from the game.
 * @param {Itemables} itemables the parsed Data itemables JSON file.
 *
 * @returns {AsyncGenerator<[ParsedAsset, import('node:fs').Stats]>} iterates over each orphaned asset with its file stat object.
 */
async function* findOrphanedAssets(baseWebLoc, extractedUeExportDir, itemables) {
    const baseWebItemIconsFolder = path.join(baseWebLoc, 'ItemIcons');
    function makeRelative(iconPath, pathName) {
        /**
         * @type {string[]}
         */
        const splitted = iconPath.split('/');
        const itemsIconIdx = splitted.indexOf(pathName);
        if (itemsIconIdx < 0) {
            return undefined;
        }
        splitted.splice(0, itemsIconIdx + 1);
        const str = splitted.join(path.sep);
        if (str.endsWith('.png')) {
            return str.substring(0, str.length - '.png'.length);
        }
        return str;
    }
    const webRelativeItems = new Set(
        itemables.Rows.map((row) => row.Icon)
            .filter((icon) => !!icon)
            .map((i) => makeRelative(i, 'Item_Icons'))
            .filter((s) => !!s)
    );

    for await (const [iconPath, iconStat] of walk(baseWebItemIconsFolder)) {
        const parsedPath = await pathLogic(iconPath, extractedUeExportDir, !!iconStat);
        const pathWebRelative = makeRelative(parsedPath.fullPathName, 'ItemIcons');
        parsedPath.pathWebRelative = pathWebRelative;
        parsedPath.inItemableFiles = webRelativeItems.has(pathWebRelative);
        if (!parsedPath.uaAssetPathExist || !parsedPath.inItemableFiles) {
            yield [parsedPath, iconStat];
        }
    }
}

/**
 * The source files to parse from the Data pak file from the game.
 */
const sourceDataFiles = {
    'D_Itemable.json': 'Traits/D_Itemable.json',
    'D_ItemsStatic.json': 'Items/D_ItemsStatic.json',
    'D_ItemTemplate.json': 'Items/D_ItemTemplate.json',
    'D_ProcessorRecipes.json': 'Crafting/D_ProcessorRecipes.json',
};

/**
 * Copies the source Data Files (JSON) from the game into the web app public assets directory
 * @param {import('node:fs').PathLike} webPublicData the web app public asset directory
 * @param {import('node:fs').PathLike} extractedUeExportDir the game's asset folder
 */
async function updateSourceDataFile(webPublicData, extractedUeExportDir) {
    for (const [sourceFileName, dataFilePath] of Object.entries(sourceDataFiles)) {
        const webFilePath = path.join(webPublicData, sourceFileName);
        const extractFilePath = path.join(extractedUeExportDir, dataFilePath);

        try {
            await copyFile(extractFilePath, webFilePath);
            await chmod(webFilePath, 0o644);
            console.log(`${extractFilePath} => ${webFilePath} copied successfully.`);
        } catch (e) {
            console.warn(`ERROR: ${extractFilePath} => ${webFilePath} failed to copy`, e.message);
        }
    }
}

/**
 * Update all of the web app assets with the assets extracted from the game.
 *
 * @param {import('node:fs').PathLike} baseWebLoc the web app public asset directory
 * @param {import('node:fs').PathLike} extractedUeExportDir the base directory of the extracted assets from the game
 */
async function updateGameAssets(baseWebLoc, extractedUeExportDir) {
    const itemables = await parseItemablesFile(baseWebLoc);

    const missingAssets = [];
    async function gather() {
        for await (const assetInfo of parseIcarusAssetsFromDataFile(baseWebLoc, extractedUeExportDir, itemables)) {
            if (!assetInfo.uaAssetPathExist) {
                missingAssets.push(assetInfo);
                continue;
            }
            try {
                await copyFile(assetInfo.uaAssetPath, assetInfo.fullPathName);
                await chmod(assetInfo.fullPathName, 0o644);
                console.log(`${assetInfo.uaAssetPath} => ${assetInfo.fullPathName} ${assetInfo.webLocExist ? 'replaced' : 'created'} successfully.`);
            } catch (e) {
                console.warn(`ERROR: ${assetInfo.uaAssetPath} => ${assetInfo.fullPathName} failed to copy`, e.message);
            }
        }
    }
    await gather();
    if (missingAssets.length) {
        console.log('Can not find these assets in the extracted assets directory\n', missingAssets.map((a) => JSON.stringify(a)).join('\n'));
    }
    let logger = (...args) => {
        console.log('Orphaned Assets');
        console.log(
            '****** These are assets in the web IconItems folder, that either does not exist in the extracted assets folder,\n',
            'or does not get referenced in the D_Itemable.json file.'
        );
        console.log(...args);
        logger = console.log;
    };
    for await (const orphanedAsset of findOrphanedAssets(baseWebLoc, extractedUeExportDir, itemables)) {
        logger(orphanedAsset[0].name);
        await rm(orphanedAsset[0].fullPathName, { force: true });
    }
}

/**
 * Main entry point of the script.  This script is expected to be ran from the scripts folder.
 */
async function main() {
    const baseWebLoc = path.join('public', 'icarus-game');
    if (!statOrUndefined(baseWebLoc)) {
        console.error('ERROR: Unable to find public/icarus-game');
        process.exit(1);
    }

    if (process.argv.length < 3) {
        console.error(`USAGE: ${process.argv[0]} ${process.argv[1]} Ue4ExportDir`);
        process.exit(1);
    }
    const extractedUeExportDir = await realpath(process.argv[2]);
    console.log('Export dir: ', extractedUeExportDir);
    if (!statOrUndefined(extractedUeExportDir)) {
        console.error('ERROR: Unable to find export directory.');
        process.exit(1);
    }

    console.log('Updating web app game data');
    await updateSourceDataFile(path.join(baseWebLoc, 'Data'), extractedUeExportDir);

    console.log('Updating web game assets');
    updateGameAssets(baseWebLoc, extractedUeExportDir);
}

await main();
