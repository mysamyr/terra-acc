import fs from "fs";
import path from "path";
import accessories from "../../web/src/store/store.json" assert { type: "json" };

export const addItem = ({
	name,
	id,
	type,
	usedIn,
	recipes,
	effect,
	obtain,
	category,
}) => {
	if (accessories[id]) {
		return { error: "Item already exists" };
	}
	if (type === "A" && !effect) {
		return { error: "Accessory should have effect" };
	}
	// todo additional validation

	const newItem = {
		id,
		name,
		path: id + ".png",
		used_in: usedIn,
		recipes,
		type,
		effect,
		obtain,
		category,
	};

	accessories[id] = newItem;

	try {
		fs.writeFileSync(
			path.join(path.resolve(), "../web/src/store/store.json"),
			JSON.stringify(accessories),
		);
	} catch (e) {
		return { error: "Cannot add new item" };
	}
	return newItem;
};
