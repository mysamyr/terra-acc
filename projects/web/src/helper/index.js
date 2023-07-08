export const validateAddAccessory = ({
	name,
	img,
	type,
	recipes,
	usedIn,
	obtain,
	categories,
}) => {
	if (!name || !img || !type || !categories.length) {
		return;
	}
	if (type === "A" && !recipes.length && !usedIn.length && !obtain) return;
	for (let recipe of recipes) {
		if (!recipe.station || !recipe.station.trim().length) return;
		if (!recipe.ingredients.length) return;
	}
	for (let item of usedIn) {
		if (!item.trim().length) return;
	}
	return true;
};
