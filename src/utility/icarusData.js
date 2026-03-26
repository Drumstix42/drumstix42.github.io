export const itemIgnoreMap = Object.freeze({
    Basic_Oxite_Dissolver: true, // unused?
    Charcoal: true, // shows "Spoiled Meat" as the only input, which is misleading
});

// Manually curated list of item display labels that are considered raw/harvestable materials.
// Entries may be exact strings or RegExp patterns matched against the resolved display label.
// Note: items with overrides in itemLabelMap should use their overridden label (e.g. 'Aluminum Ore' not 'Bauxite').
export const rawItemMatchers = Object.freeze([
    // --- Patterns ---
    /Ore$/, // Iron Ore, Copper Ore, Coal Ore, Gold Ore, Platinum Ore, Titanium Ore, etc.
    /Vestige$/, // e.g. "Alpha Wolf Vestige"
    /Fur$/, // e.g. "Bear Fur", "Wolf Fur"
    /Noxious Crust/,
    /Animal Fat/,
    /Meat$/, // e.g. "Raw Meat", "Cooked Meat"
    /Carcass$/, // e.g. "Small Carcass", "Medium Carcass", "Large Carcass"
    /Pelt$/, // e.g. "Rabbit Pelt", "Wolf Pelt"

    // --- Exact labels ---
    'Aluminum Ore', // itemLabelMap override (ID: Bauxite)
    'Animal Fat',
    'Bone',
    'Clay',
    'Condensed Enzymes',
    'Egg',
    'Exotics',
    'Fiber',
    'Fur',
    'Leather',
    'Obsidian',
    'Oxite',
    'Poison Sac',
    'Salt',
    'Scoria',
    'Seed',
    'Silica',
    'Stabilized Exotics',
    'Stone',
    'Stick',
    'Sulfur',
    'Tree Sap',
    'Volatile Raw Exotics',
    'Wood',
    // TODO: add more as needed
]);

export const isRawItem = (label) => rawItemMatchers.some((matcher) => (matcher instanceof RegExp ? matcher.test(label) : matcher === label));

export const itemLabelMap = Object.freeze({
    // raw material that doesn't have a recipe definition with `Name` will need correcting
    Bauxite: 'Aluminum Ore',
    Copper_Ore: 'Copper Ore',
    Iron_Ore: 'Iron Ore',
    Gold_Ore: 'Gold Ore',
    Metal_Ore: 'Iron Ore',
    Coal_Ore: 'Coal Ore',
    Platinum_Ore: 'Platinum Ore',
    Titanium_Ore: 'Titanium Ore',
    /* Refined_Metal: 'Iron Ingot',
    Refined_Copper: 'Copper Ingot',
    Refined_Gold: 'Gold Ingot',
    Metal_Axe: 'Iron Axe',
    Metal_Bolt: 'Iron Bolt',
    Metal_Crate_Medium: 'Iron Crate Medium',
    Metal_Crate_Small: 'Iron Crate Small',
    Metal_Cupboard: 'Iron Cupboard',
    Metal_Knife: 'Iron Knife',
    Metal_Pickaxe: 'Iron Pickaxe',
    Metal_Spear: 'Iron Spear',
    Carpentry_Bench_T4: 'Electric Carpentry Bench',
    Masonry_Bench_T4: 'Electric Masonry Bench', */
    Stick_Talent: 'Stick (Talent)',
    Talent_Leather_Rope: 'Rope (Leather, Talent)',
    /* Armor_Bench: 'Textiles Bench', */
    Rope_Armor_Bench: 'Rope (Armor Bench)',
    Epoxy_2: 'Epoxy (Crushed Bone)',
    Raw_Meat: 'Raw Meat',
    /* Building_UpgradeTool: 'Building Upgrade Tool', */
    Composite_Paste: 'Composite Paste (Gold)',
    Composite_Paste_Plat: 'Composite Paste (Platinum)',
    /* Food_Cooked_Carrot: 'Barbecue Carrot',
    Food_Cooked_Corn: 'Charred Corn',
    Food_Corn_Soup: 'Corn Soup',
    Food_Creamed_Corn: 'Creamed Corn',
    Food_Cooked_Pumpkin: 'Grilled Pumpkin',
    Food_Cooked_Squash: 'Roasted Squash',
    Food_Meat_Stew: 'Meat Stew',
    Food_Fish_Dish: 'Fish Dish',
    Food_Fried_Soy_Beans: 'Fried Soy Beans',
    Food_Mushroom_Soup: 'Mushroom Soup',
    Food_Fruit_Salad: 'Fruit Salad',
    Food_Roasted_Vegetables: 'Roasted Vegetables',
    Food_Cooked_Mushroom: 'Seared Mushroom',
    Food_Wild_Salad: 'Field Salad',
    Paste_Food_Consumption: 'Food Paste',
    Glass_Bottle_Beer: 'Beer Bottle',
    Glass_Bottle_Wine: 'Wine Bottle',
    Glass_Jar_Jam: 'Berry Jam',
    Wood_Floor_CarpentryBench: 'Wood Floor (Carpentry Bench)',
    Wood_Frame_CarpentryBench: 'Wood Frame (Carpentry Bench)',
    Wood_Ramp_CarpentryBench: 'Wood Ramp (Carpentry Bench)',
    Wood_Wall_Angled_CarpentryBench: 'Wood Wall Angled (Carpentry Bench)',
    Wood_Wall_CarpentryBench: 'Wood Wall (Carpentry Bench)', */
    Steel_Bloom: 'Steel Bloom (Ore)',
    Steel_Bloom2: 'Steel Bloom (Ingot)',
    Spoiled_Meat: 'Spoiled Meat',
    Spoiled_Plants: 'Spoiled Plants',
    /* Jerrycan: 'Biofuel Can',
    Platinum_Weave: 'Platinum Weave',
    Platinum_Wave: 'Platinum Weave', */
    Biofuel1: 'Biofuel (Raw Meat)',
    Biofuel2: 'Biofuel (Fiber)',
    Biofuel3: 'Biofuel (Stick)',
    Biofuel4: 'Biofuel (Wood)',
    Biofuel5: 'Biofuel (Cooked Meat)',
    Ammo_Pistol_Round: 'Pistol Round',
    Ammo_Rifle_Round: 'Rifle Round',
    Ammo_Shell_Buckshot: 'Shotgun Buckshot Shell',
    Bulk_Rifle_Round: 'Rifle Round (Bulk, Talent)',
    Bulk_Pistol_Round: 'Pistol Round (Bulk, Talent)',
    Shotgun_Shell_Buckshot: 'Shotgun Buckshot Shell',
    Bulk_Shotgun_Shell_Buckshot: 'Shotgun Buckshot Shell (Bulk, Talent)',
    Sugar_Cane: 'Sugar (Cane)',
    Sugar_Honey: 'Sugar (Honey)',
    Sugar_Kumara: 'Sugar (Kumara)',
});

const cleanItemDefaultLabel = (itemId) => {
    // replace under scores with spaces
    return itemId.replace(/_/g, ' ');
};

const getItemLabel = (itemId, { displayName } = {}) => {
    const label = itemLabelMap[itemId];
    return label ? label : (displayName ?? cleanItemDefaultLabel(itemId));
};

const normalizeItemId = (value = '') => value.toLowerCase().split('_').filter(Boolean).sort().join('_');

const isSameItemVariant = (left, right) => {
    if (!left || !right) {
        return false;
    }
    return left === right || normalizeItemId(left) === normalizeItemId(right);
};

const postProcessByItem = Object.freeze({
    /* Stick(item, id, recipeData) {
        // TODO: add talent toggle to support this option
        item.sources.unshift('Character');
        item.preferredSource = item.sources[0];
    },
    Stick_Talent(item, id, recipeData) {
        delete recipeData[id];
    }, */
});

/* const cleanItemTableName = (itemName = '') => {
    return itemName.replace(/^Item_Kit_/, '').replace(/^Item_/, '');
}; */

const cleanItemTableDisplayName = (displayName = '') => {
    const matchIndex = 3;
    const stringMatches = displayName.replace(/\"/g, '').match(/NSLOCTEXT\((.*), (.*), (.*)\)/);
    return stringMatches?.[matchIndex];
};

const cleanItemTableIconPath = (path = '') => {
    return path.replace('/Game/Assets/2DArt/UI/Items/Item_Icons/', '');
};

export function processItemTemplateData(rows = []) {
    const itemTemplateData = {};

    rows.forEach((itemRecord) => {
        const itemId = itemRecord.Name;

        if (!itemTemplateData[itemId]) {
            itemTemplateData[itemId] = {
                id: itemId,
                itemStaticId: itemRecord.ItemStaticData?.RowName,
            };
        }
    });

    return itemTemplateData;
}

export function processItemStaticData(rows = []) {
    const itemStaticData = {};

    rows.forEach((itemRecord) => {
        const itemId = itemRecord.Name;
        if (!itemStaticData[itemId]) {
            itemStaticData[itemId] = {
                id: itemId,
                itemTableId: itemRecord.Itemable?.RowName,
            };
        }
    });

    return itemStaticData;
}

export function processItemTableData(rows = []) {
    const itemTableData = {};

    rows.forEach((itemRecord) => {
        const itemId = itemRecord.Name;

        if (!itemTableData[itemId]) {
            itemTableData[itemId] = {
                id: itemId,
                displayName: cleanItemTableDisplayName(itemRecord.DisplayName),
                //description: cleanDescription(itemRecord.Description),
                icon: cleanItemTableIconPath(itemRecord.Icon),
            };
        }
    });

    return itemTableData;
}

export function processRecipeData(rows = [], { itemTemplateData = {}, itemStaticData = {}, itemTableData = {} } = {}) {
    const recipeDataByName = {};

    // map Array to Object so we can cross reference as needed
    rows.forEach((recipe) => {
        recipeDataByName[recipe.Name] = recipe;
    });

    // case-insensitive fallback map for itemStaticData (game data exports have inconsistent casing)
    const itemStaticDataNorm = Object.fromEntries(Object.entries(itemStaticData).map(([k, v]) => [k.toLowerCase(), v]));

    const recipeData = {};

    rows.forEach((recipe) => {
        //const maxFilePathLength = 100;
        const id = recipe.Name;

        if (itemIgnoreMap[id]) {
            return;
        }

        // TODO: setup custom data merge for known duplicates (e.g. Rope, Talent_Leather_Rope)

        const itemTemplateId = id;
        const outputFallbackId = () => {
            /* if (id === 'Ammo_EDS_MissionModified') {
                debugger;
            } */
            const outputName = recipe.Outputs[0]?.Element.RowName;
            if (
                recipe.Outputs.length === 1 &&
                outputName &&
                (isSameItemVariant(outputName, itemTemplateId) || recipe.Requirement || recipe.SessionRequirement || !recipeDataByName[outputName])
            ) {
                return outputName;
            }
            return null;
        };
        const inputFallbackId = recipe.Inputs[0]?.Element.RowName;
        const itemTemplateRecord =
            itemTemplateData[itemTemplateId] ?? itemTemplateData[recipe.Requirement?.RowName] ?? itemTemplateData[outputFallbackId()];
        const itemStaticRecord =
            itemStaticData[itemTemplateRecord?.itemStaticId] ??
            itemStaticDataNorm[itemTemplateRecord?.itemStaticId?.toLowerCase()] ??
            itemStaticData[id];

        if (!itemStaticRecord) {
            /* console.warn('Missing itemStaticRecord for', {
                id,
                inputFallbackId,
                itemTemplateId,
                itemTemplateRecord,
                itemStaticRecord,
                recipe,
                recipeDataByName,
            }); */
        }

        const iconPath = recipe.ResourceOutputs?.length > 0 ? '' : (itemTableData[itemStaticRecord?.itemTableId]?.icon ?? '');

        // since the PNG files are now deduplicated, but the code references are not
        // we can just take the first part of the file name, e.g. `"Weapons/Guns/T_ITEM_Pistol_T4.T_ITEM_Pistol_T4"` => `"Weapons/Guns/T_ITEM_Pistol_T4"`
        const iconPathDedupe = iconPath?.length > 0 && iconPath.includes('.') ? iconPath.split('.')[0] : '';
        const outputItemId = recipe.Outputs?.length === 1 ? recipe.Outputs[0]?.Element?.RowName : null;

        recipeData[id] = {
            id: id,
            label: getItemLabel(id, { displayName: itemTableData[itemStaticRecord?.itemTableId]?.displayName }),
            iconPath: iconPathDedupe ?? iconPath ?? '',
            outputItemId,
            itemStaticId: itemStaticRecord?.id,

            inputs: [],
            sources: [],
            preferredSource: null,
            outputQuantity: 1,
        };

        // build list of input item objects
        (recipe.Inputs || []).forEach((input) => {
            recipeData[id].inputs.push({
                id: input.Element.RowName,
                quantity: input.Count,
            });
        });

        // build list of source (crafting source/bench) item names
        (recipe.RecipeSets || []).forEach((source) => {
            recipeData[id].sources.push(source.RowName);
        });

        // TODO: set preferred source from localStorage
        // for now just default to the first source if it exists
        recipeData[id].preferredSource = recipeData[id].sources[0];

        // determine output quantity
        (recipe.Outputs || []).forEach((output) => {
            if (isSameItemVariant(id, output.Element.RowName)) {
                recipeData[id].outputQuantity = output.Count;
            }
        });

        /* // Some recipes use a different recipe name than the produced item id
        // (e.g. Refined_Wood -> Wood_Refined). For single-output recipes,
        // use the output count directly so quantity math remains accurate.
        if (recipeData[id].outputQuantity === 1 && recipe.Outputs?.length === 1) {
            recipeData[id].outputQuantity = recipe.Outputs[0].Count ?? 1;
        }

        // When recipe.Name differs from the actual output item ID (e.g. Refined_Wood -> Wood_Refined),
        // register an alias key for lookup-by-input without changing the canonical recipe object's id.
        // Mutating recipeData[id].id causes incorrect identity in sub-component calculations.
        const outputItemId = recipe.Outputs.length === 1 ? recipe.Outputs[0]?.Element.RowName : null;
        if (outputItemId && outputItemId !== id && isSameItemVariant(id, outputItemId) && !recipeData[outputItemId]) {
            recipeData[outputItemId] = recipeData[id]; // alias; same object reference
        }

        // When D_ItemsStatic RowName differs from recipe name due data typo
        // (e.g. Platinum_Shealth vs Platinum_Sheath), alias the static id lookup.
        // Only do this when the recipe's produced item is still the same canonical item,
        // otherwise alternate conversion recipes can overwrite canonical raw item labels.
        const staticAliasOutputItemId = recipe.Outputs?.length === 1 ? recipe.Outputs[0]?.Element?.RowName : null;
        const outputsSameItem = !staticAliasOutputItemId || isSameItemVariant(staticAliasOutputItemId, id);
        if (outputsSameItem && itemStaticRecord && itemStaticRecord.id !== id && !recipeData[itemStaticRecord.id]) {
            recipeData[itemStaticRecord.id] = recipeData[id]; // alias; same object reference
        } */
    });

    return { recipeData: postProcessData(recipeData) };
}

export function generateHighlightedText(inputText, regions = []) {
    let content = '';
    let nextNonHighlightedRegionStartingIndex = 0;

    regions.forEach((region) => {
        const lastRegionNextIndex = region[1] + 1;
        const nonHighlightedRegion = inputText.substring(nextNonHighlightedRegionStartingIndex, region[0]);
        const highlightedRegion = inputText.substring(region[0], lastRegionNextIndex);
        content += `${nonHighlightedRegion}<span class="highlight-result">${highlightedRegion}</span>`;

        nextNonHighlightedRegionStartingIndex = lastRegionNextIndex;
    });

    content += inputText.substring(nextNonHighlightedRegionStartingIndex);

    return content;
}

function postProcessData(recipeData = {}) {
    if (Object.keys(postProcessByItem).length > 0) {
        // apply any custom post processing defined for specific items
        Object.keys(recipeData).forEach((id) => {
            const item = recipeData[id];
            postProcessByItem[id]?.(item, id, recipeData);
        });
    }
    return recipeData;
}
