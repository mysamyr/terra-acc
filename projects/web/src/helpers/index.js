export const objToArr = (obj) => Object.values(obj);

export const arrayToObj = (arr) =>
	arr.reduce((acc, item) => {
		acc[item.id] = item;
		return acc;
	}, {});

export const sortById = (arr) =>
	arr.sort((a, b) => {
		if (a.id < b.id) return -1;
		if (a.id > b.id) return 1;
		return 0;
	});

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
		if (!recipe.stations || !recipe.stations.trim().length) return;
		if (!recipe.ingredients.length) return;
	}
	for (let item of usedIn) {
		if (!item.trim().length) return;
	}
	return true;
};
