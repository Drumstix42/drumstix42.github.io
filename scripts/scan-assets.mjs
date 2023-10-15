import { readdir, readFile, stat, copyFile, rm } from 'node:fs/promises';
import * as path from 'node:path';
/**
 * @typedef ItemRow
 * @type {object}
 * @property {string} Name
 * @property {string|undefined} Icon
 */
/**
 * @typedef Itemables
 * @type {object}
 * @property {ItemRow[]} Rows
 */
/**
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
/**
 * 
 * @param {import('node:fs').PathLike} pathLike 
 * @returns 
 */
async function statOrUndefined(pathLike) {
    try {
        return await stat(pathLike)
    } catch {
        return undefined;
    }
}

/**
 * @param {import('node:fs').PathLike[]} items
 * @returns {AsyncGenerator<[import('node:fs').PathLike, import('node:fs').Stats]>}
 */
async function* statFileLikeItems(items, baseName) {
    for (const item of items) {
        const fullName = path.join(baseName, item);
        yield [fullName, await statOrUndefined(fullName)];
    }
}

/**
 * @param {import('node:fs').PathLike} startDir
 * @returns {AsyncGenerator<[import('node:fs').PathLike, import('node:fs').Stats]>}
 */
async function* walk(startDir) {
    const items = await readdir(startDir);
    for await (const [item, itemStat] of statFileLikeItems(items, startDir)) {
        if (itemStat) {
            if (itemStat.isDirectory()) {
                yield * await walk(item);
            } else {
                yield [item, itemStat];
            }
        }
    }
}

/**
 * 
 * @param {import('node:fs').PathLike} fullPathName 
 * @param {import('node:fs').PathLike} extractedAssetsDir 
 * @param {boolean} webLocExist 
 * @returns {Promise<ParsedAsset>}
 */
async function pathLogic(fullPathName, extractedAssetsDir, webLocExist) {
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
    const uaAssetName = hasDuplicatedName ? `${parsedPathNameSplit[0]}.png` : parsedPath.base;
    const uaAssetPath = path.join(extractedAssetsDir, ...categories, uaAssetName);
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
        fullPathName
    }
}

/** 
 * @param {import('node:fs').PathLike} baseWebLoc
 * @returns {Promise<Itemables>}
 */
async function parseItemablesFile(baseWebLoc) {
    const itemableJsonFileName = path.join(baseWebLoc, 'Data', 'D_Itemable.json');
     return JSON.parse(await readFile(itemableJsonFileName, { encoding: 'utf-8' }));
}

/**
 * This generator iterates over each item in D_Itemable.json and outputs a parse structure for the asset.
 * 
 * @param {*} baseWebLoc 
 * @param {*} extractedAssetsDir 
 * @param {Itemables} itemables
 */
async function * parseIcarusAssetsFromDataFile(baseWebLoc, extractedAssetsDir, itemables) {
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

        yield await pathLogic(webPathName, extractedAssetsDir, !!statOrUndefined(webPathName));
    }
}
/**
 * 
 * @param {import('node:fs').PathLike} baseWebLoc 
 * @param {import('node:fs').PathLike} extractedAssetsDir 
 * @param {Itemables} itemables
 * @returns {AsyncGenerator<[ParsedAsset, import('node:fs').Stats]>}
 */
async function * findOrphanedAssets(baseWebLoc, extractedAssetsDir, itemables) {
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
    const webRelativeItems = new Set(itemables.Rows.map(row => row.Icon).filter(icon => !!icon).map(i => makeRelative(i, 'Item_Icons')).filter(s => !!s));

    for await (const [iconPath, iconStat] of walk(baseWebItemIconsFolder)) {
        const parsedPath = await pathLogic(iconPath, extractedAssetsDir, !!iconStat);
        const pathWebRelative = makeRelative(parsedPath.fullPathName, 'ItemIcons');
        parsedPath.pathWebRelative = pathWebRelative;
        parsedPath.inItemableFiles = webRelativeItems.has(pathWebRelative);
        if (!parsedPath.uaAssetPathExist || !parsedPath.inItemableFiles) {
            yield [parsedPath, iconStat];
        }
    }
}

const sourceDataFiles = {
    'D_Itemable.json': 'Traits/D_Itemable.json',
    'D_ItemsStatic.json': 'Items/D_ItemsStatic.json',
    'D_ItemTemplate.json': 'Items/D_ItemTemplate.json',
    'D_ProcessorRecipes.json': 'Crafting/D_ProcessorRecipes.json',
};

async function updateSourceDataFile(webPublicData, extractedDataDir) {
    for (const [sourceFileName, dataFilePath] of Object.entries(sourceDataFiles)) {
        const webFilePath = path.join(webPublicData, sourceFileName);
        const extractFilePath = path.join(extractedDataDir, dataFilePath);

        try {
            await copyFile(extractFilePath, webFilePath);
            console.log(`${extractFilePath} => ${webFilePath} copied successfully.`);
        } catch (e) {
            console.warn(`ERROR: ${extractFilePath} => ${webFilePath} failed to copy`, e.message);
        }
    }
}

async function updateGameAssets(baseWebLoc, extractedAssetsDir) {
    const itemables = await parseItemablesFile(baseWebLoc);

    const missingAssets = [];
    async function gather() {
        for await (const assetInfo of parseIcarusAssetsFromDataFile(baseWebLoc, extractedAssetsDir, itemables)) {
            if (!assetInfo.uaAssetPathExist) {
                missingAssets.push(assetInfo);
                continue;
            }
            try {
                await copyFile(assetInfo.uaAssetPath, assetInfo.fullPathName);
                console.log(`${assetInfo.uaAssetPath} => ${assetInfo.fullPathName} ${assetInfo.webLocExist ? 'replaced' : 'created'} successfully.`);
            } catch (e) {
                console.warn(`ERROR: ${assetInfo.uaAssetPath} => ${assetInfo.fullPathName} failed to copy`, e.message);
            }
        }
    }
    await gather();
    if (missingAssets.length) {
        console.log('Can not find these assets in the extracted assets directory\n', missingAssets.join('\n'));
    }
    let logger = (...args) => {
        console.log('Orphaned Assets');
        console.log('****** These are assets in the web IconItems folder, that either does not exist in the extracted assets folder,\n',
                    'or does not get referenced in the D_Itemable.json file.');
        console.log(...args);
        logger = console.log;
    }
    for await (const orphanedAsset of findOrphanedAssets(baseWebLoc, extractedAssetsDir, itemables)) {
        logger(orphanedAsset[0].name);
        await rm(orphanedAsset[0].fullPathName, { force: true });
    }
}

async function main() {
    const baseWebLoc = '../public/icarus-game';
    if (!statOrUndefined(baseWebLoc)) {
        console.error('ERROR: Unable to find public/icarus-game');
        process.exit(1);
    }

    if (process.argv.length < 4) {
        console.error(`USAGE: ${process.argv[0]} ${process.argv[1]} extractedAssetsDir extractedDataDir`);
        process.exit(1);
    }
    const extractedAssetsDir = process.argv[2];
    const extractedDataDir = process.argv[3];

    console.log('Updating web app game data');
    await updateSourceDataFile(path.join(baseWebLoc, 'Data'), extractedDataDir);

    console.log('Updating web game assets');
    updateGameAssets(baseWebLoc, extractedAssetsDir);
}

await main();


