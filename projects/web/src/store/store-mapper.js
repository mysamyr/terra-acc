const accessories = require("./store.json");
const fs = require("fs");

const pipe = (first, ...more) =>
	more.reduce(
		(acc, curr) =>
			(...arguments) =>
				curr(acc(...arguments)),
		first,
	);

const objToArr = (obj) => Object.values(obj);
const arrayToObj = (arr) =>
	arr.reduce((acc, item) => {
		acc[item.id] = item;
		return acc;
	}, {});
const sortById = (arr) =>
	arr.sort((a, b) => {
		if (a.id < b.id) return -1;
		if (a.id > b.id) return 1;
		return 0;
	});
const validateAccessories = (arr) => {
	arr.forEach((a, a_idx) => {
		// main validation
		if (!a) {
			throw new Error("provide item, please! " + a_idx);
		}
		if (typeof a !== "object") {
			throw new Error("item should be an object! " + a_idx);
		}
		if (
			!a.hasOwnProperty("id") ||
			!a.hasOwnProperty("name") ||
			!a.hasOwnProperty("path") ||
			!a.hasOwnProperty("used_in") ||
			!a.hasOwnProperty("recipes") ||
			!a.hasOwnProperty("type") ||
			!a.hasOwnProperty("effect") ||
			!a.hasOwnProperty("obtain") ||
			!a.hasOwnProperty("category")
		) {
			throw new Error("item should contain all required keys! " + a_idx);
		}
		if (!a.id || !a.name || !a.path) {
			throw new Error("item should contain all required fields! " + a_idx);
		}
		if (typeof a.id !== "string") {
			throw new Error("id should be a string! " + a_idx);
		}
		if (typeof a.name !== "string") {
			throw new Error("name should be a string! " + a_idx);
		}
		if (typeof a.path !== "string") {
			throw new Error("path should be a string! " + a_idx);
		}
		if (!Array.isArray(a.used_in)) {
			throw new Error("used_in should be an array! " + a_idx);
		}
		if (!Array.isArray(a.recipes)) {
			throw new Error("recipes should be an array! " + a_idx);
		}
		if (typeof a.type !== "string") {
			throw new Error("type should be a string! " + a_idx);
		}
		if (typeof a.effect !== "string") {
			throw new Error("effect should be a string! " + a_idx);
		}
		if (typeof a.obtain !== "string") {
			throw new Error("obtain should be a string! " + a_idx);
		}
		if (Array.isArray(a.category)) {
			throw new Error("category should be a string! " + a_idx);
		}
		if (!a.type || !a.type.trim().length || !["A", "S", "I"].includes(a.type)) {
			throw new Error("item should have type (A, S or I)! " + a.id);
		}
		// custom validation
		if (a.id.includes(" ") || a.path.includes(" ")) {
			throw new Error("id/path cannot contain spaces! " + a.id);
		}
		if (!a.path.includes(".png") || !a.path.includes(".gif")) {
			throw new Error("path should contain valid path to image! " + a.id);
		}
		if (a.id.type === "A") {
			if (!a.category.length) {
				throw new Error("accessory should have at least 1 category! " + a.id);
			}
			if (!a.recipe.length && !a.obtain.length) {
				throw new Error(
					"accessory should contain way to obtain it or recipe! " + a.id,
				);
			}
			a.used_in.forEach((u) => {
				if (!u || typeof u !== "string" || !u.length) {
					throw new Error("used_in has empty value! " + a.id + ">" + u);
				}
				if (!accessories[u]) {
					console.error(
						"used_in value doesn't exist in database! " + a.id + ">" + u,
					);
				}
			});
			a.recipe.forEach((r) => {
				if (!r) {
					throw new Error("recipe has empty value! " + a.id);
				}
				if (typeof r !== "object") {
					throw new Error("recipe should be an object! " + a.id);
				}
				if (!r.hasOwnProperty("ingredients") || !r.hasOwnProperty("stations")) {
					throw new Error(
						"recipe should consist of ingredients and station(-s)! " + a.id,
					);
				}
				if (Array.isArray(r.ingredients)) {
					throw new Error("ingredients should be an array! " + a.id);
				}
				if (!r.ingredients.length) {
					throw new Error("ingredients cannot be empty! " + a.id);
				}
				if (Array.isArray(r.stations)) {
					throw new Error("stations should be an array! " + a.id);
				}
				if (!r.stations.length) {
					throw new Error("stations cannot be empty! " + a.id);
				}
				r.ingredients.forEach((i) => {
					if (!i || (typeof i !== "string" && Array.isArray(i)) || !i.length) {
						throw new Error(
							"recipe should contain valid ingredients (string or array of strings)! " +
								a.id,
						);
					}
					if (Array.isArray(i)) {
						i.forEach((ii) => {
							if (!ii || typeof ii !== "string" || !ii.length) {
								throw new Error(
									"recipe should contain valid ingredients (string or array of strings)! " +
										a.id,
								);
							}
						});
					}
					if (!accessories[i]) {
						console.error(
							"ingredient doesn't exist in database! " + a.id + ">" + i,
						);
					}
				});
				r.stations.forEach((s) => {
					if (!s || typeof s !== "string" || !s.length) {
						throw new Error("stations should contain valid station! " + a.id);
					}
					if (!accessories[s]) {
						console.error(
							"station doesn't exist in database! " + a.id + ">" + s,
						);
					}
				});
			});
			a.category.forEach((c) => {
				if (!c || typeof c !== "string" || !c.length) {
					throw new Error("category has empty value! " + a.id + ">" + c);
				}
			});
		}
		if (a.id.type === "S" || a.id.type === "I") {
			if (
				a.category.length ||
				a.used_in.length ||
				a.recipes.length ||
				a.effect.length
			) {
				throw new Error(
					"all optional field will be ignored for stations or ingredients! " +
						a.id,
				);
			}
		}
	});
};
const addNewItems = (arr) => {
	const newItems = [
		{
			id: "",
			name: "",
			path: ".png",
			used_in: [""],
			recipes: [
				{
					ingredients: [],
					stations: ["tinkerer's_workshop"],
				},
			],
			type: "A",
			effect: "",
			obtain: "",
			category: ["Wings"],
		},
	];
	validateAccessories(newItems);
	return [...arr, ...newItems];
};

const res = pipe(objToArr, addNewItems, sortById, arrayToObj)(accessories);

fs.writeFileSync("./store.json", JSON.stringify(res));
