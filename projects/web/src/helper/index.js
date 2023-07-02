export const makeKey = (prefix, id) => prefix + "_" + id;

export const validateAddAccessory = ({name, img, type, recipes, usedIn}) => {
  if (!name || !img || !type) {
    return;
  }
  if (type === "A" && !recipes.length && !usedIn.length) return;
  for (let recipe of recipes) {
    if (!recipe.station || !recipe.station.trim().length) return;
    if (!recipe.ingredients.trim().length) return;
  }
  for (let item of usedIn) {
    if (!item.trim().length) return;
  }
  return true;
};
