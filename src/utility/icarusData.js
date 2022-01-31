export const recipeLabelMap = Object.freeze({
    // TODO: setup label values for recipe item names
    1: '1',
});

export function processRecipeData(rows = []) {
    const recipeData = {};

    rows.forEach((recipe) => {
        const itemName = recipe.Name;
        const image = new Image();
        image.src = `/Icarus/ItemIcons/ITEM_${itemName}.png`;

        recipeData[itemName] = {
            // TODO: add `label` parsing?
            label: itemName,
            value: itemName,

            image,

            inputs: [],
            sources: [],
            quantity: 1,
        };

        // build list of input item objects
        (recipe.Inputs || []).forEach((input) => {
            recipeData[itemName].inputs.push({
                itemName: input.Element.RowName,
                quantity: input.Count,
            });
        });

        // build list of source (crafting source/bench) item names
        (recipe.RecipeSets || []).forEach((source) => {
            recipeData[itemName].sources.push(source.RowName);
        });

        // determine output quantity
        (recipe.Outputs || []).forEach((output) => {
            if (itemName === output.Element.RowName || itemName.includes(output.Element.RowName)) {
                recipeData[itemName].quantity = output.Count;
            }
        });
    });

    return recipeData;
}
