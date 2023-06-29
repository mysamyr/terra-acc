import accessories from "../../web/src/store/store2.json" assert { type: "json" };
import {sort} from "./helpers.js";
import fs from "fs";

export const addItem = ({name, id, type, usedIn, effect, obtain}) => {
  if (accessories[id]) {
    return {error: "Item already exists"};
  }
  if (type === "A" && !effect) {
    return {error: "Accessory should have effect"};
  }
  // todo validation
  const path = id + ".png";

  const newItem = {
    id,
    name,
    path,
    used_in: usedIn,
    // todo
    recipes: [],
    type,
    effect,
    obtain,
  };
  const array = Object.values(accessories);
  array.push(newItem);
  const res = sort(array);

  try {
    fs.writeFileSync("../src/store/store3.json", JSON.stringify(res));
  } catch (e) {
    return {error: "Cannot add new item"};
  }
  return newItem;
};
