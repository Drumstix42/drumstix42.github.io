export const itemIgnoreMap = Object.freeze({
    Basic_Oxite_Dissolver: true,
});

export const itemLabelMap = Object.freeze({
    Bauxite: 'Aluminum Ore',
    Copper_Ore: 'Copper Ore',
    Iron_Ore: 'Iron Ore',
    Gold_Ore: 'Gold Ore',
    Metal_Ore: 'Iron Ore',
    Coal_Ore: 'Coal Ore',
    Platinum_Ore: 'Platinum Ore',
    Titanium_Ore: 'Titanium Ore',
    Refined_Metal: 'Refined Iron',
    Metal_Axe: 'Iron Axe',
    Metal_Bolt: 'Iron Bolt',
    Metal_Crate_Medium: 'Iron Crate Medium',
    Metal_Crate_Small: 'Iron Crate Small',
    Metal_Cupboard: 'Iron Cupboard',
    Metal_Knife: 'Iron Knife',
    Metal_Pickaxe: 'Iron Pickaxe',
    Metal_Spear: 'Iron Spear',
    Carpentry_Bench_T4: 'Electric Carpentry Bench',
    Masonry_Bench_T4: 'Electric Masonry Bench',
    Stick_Talent: 'Stick (Talent)',
    Talent_Leather_Rope: 'Rope (Talent)',
    Armor_Bench: 'Textiles Bench',
    Rope_Armor_Bench: 'Rope (Armor Bench)',
    Epoxy_2: 'Epoxy (Crushed Bone)',
    Raw_Meat: 'Raw Meat',
    Building_UpgradeTool: 'Building Upgrade Tool',
});

const cleanItemDefaultLabel = (itemId) => {
    // replace under scores with spaces
    return itemId.replace(/_/g, ' ');
};

const getItemLabel = (itemId) => {
    const label = itemLabelMap[itemId];
    return label ? label : cleanItemDefaultLabel(itemId);
};

export function processRecipeData(rows = []) {
    const recipeData = {};

    rows.forEach((recipe) => {
        const id = recipe.Name;

        if (itemIgnoreMap[id]) {
            return;
        }

        // TODO: setup custom data merge for known duplicates (e.g. Rope, Talent_Leather_Rope)

        recipeData[id] = {
            label: getItemLabel(id),
            id: id,

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
        recipeData[id].preferredSource = recipeData[id].sources[0];

        // determine output quantity
        (recipe.Outputs || []).forEach((output) => {
            if (id === output.Element.RowName || id.includes(output.Element.RowName)) {
                recipeData[id].outputQuantity = output.Count;
            }
        });
    });

    return recipeData;
}
