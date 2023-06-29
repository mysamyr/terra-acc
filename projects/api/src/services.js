import fs from "fs";
import path from "path";
import accessories from "../../web/src/store/store3.json" assert { type: "json" };
import {sort} from "./helpers.js";

export const addItem = ({name, id, type, usedIn, recipes, effect, obtain}) => {
  if (accessories[id]) {
    return {error: "Item already exists"};
  }
  if (type === "A" && !effect) {
    return {error: "Accessory should have effect"};
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
  };
  const array = Object.values(accessories);
  array.push(newItem);
  const res = sort(array);

  try {
    fs.writeFileSync(path.join(path.resolve(), "../web/src/store/store3.json"), JSON.stringify(res));
  } catch (e) {
    return {error: "Cannot add new item"};
  }
  return newItem;
};
