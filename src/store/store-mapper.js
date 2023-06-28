const accessories = require("./store.json");
const fs = require("fs");

const objToArr = (obj) => Object.values(obj);
const arrayToObj = (arr) => arr.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
const sort = (arr) => {
  const sortedArr = arr.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
  return arrayToObj(sortedArr);
};

const array = objToArr(accessories);
const newItems = [
  {
    id: "flying_carpet",
    name: "Flying Carpet",
    path: "flying_carpet.png",
    used_in: [],
    recipes: [
      {
        ingredients: [
          "pharaoh's_robe"
        ],
        station: "shimmer"
      }
    ],
    type: "A",
    effect: "Allows the owner to float for a few seconds",
    obtain: "Pyramid's Chest"
  },
  {
    id: "pharaoh's_robe",
    name: "Pharaoh's Robe",
    path: "pharaoh's_robe.png",
    used_in: [],
    recipes: [],
    type: "I",
    effect: "",
    obtain: "Pyramids Chest"
  },
  {
    id: "inner_tube",
    name: "Inner Tube",
    path: "inner_tube.png",
    used_in: [],
    recipes: [],
    type: "A",
    effect: "Grants the ability to float in water",
    obtain: "Ocean Crate, Seaside Crate, Water Chest"
  },
  {
    id: "magiluminescence",
    name: "Magiluminescence",
    path: "magiluminescence.png",
    used_in: [],
    recipes: [{
      ingredients: ["crimtane_bar", "topaz"],
      station: "anvil"
    }, {
      ingredients: ["demonite_bar", "topaz"],
      station: "anvil"
    }],
    type: "A",
    effect: "Increases movement speed and acceleration\nProvides light when worn\n'A brief light in my dark life.'",
    obtain: ""
  },
  {
    id: "anvil",
    name: "Anvil",
    path: "anvil.png",
    used_in: [],
    recipes: [],
    type: "S",
    effect: "",
    obtain: ""
  },
  {
    id: "crimtane_bar",
    name: "Crimtane Bar",
    path: "crimtane_bar.png",
    used_in: [],
    recipes: [],
    type: "I",
    effect: "",
    obtain: ""
  },
  {
    id: "demonite_bar",
    name: "Demonite Bar",
    path: "demonite_bar.png",
    used_in: [],
    recipes: [],
    type: "I",
    effect: "",
    obtain: ""
  },
  {
    id: "topaz",
    name: "Topaz",
    path: "topaz.png",
    used_in: [],
    recipes: [],
    type: "I",
    effect: "",
    obtain: ""
  },
  {
    id: "pygmy_necklace",
    name: "Pygmy Necklace",
    path: "pygmy_necklace.png",
    used_in: [],
    recipes: [],
    type: "A",
    effect: "Increases your max number of minions by 1",
    obtain: "Purchase from the Witch Doctor for 20 gold at night"
  },
  {
    id: "papyrus_scarab",
    name: "Papyrus Scarab",
    path: "papyrus_scarab.png",
    used_in: [],
    recipes: [{
      ingredients: ["necromantic_scroll", "hercules_beetle"],
      station: "tinkerer's_workshop"
    }],
    type: "A",
    effect: "Increases your max number of minions by 1\nIncreases the damage and knockback of your minions",
    obtain: ""
  },
  {
    id: "necromantic_scroll",
    name: "Necromantic Scroll",
    path: "necromantic_scroll.png",
    used_in: ["papyrus_scarab"],
    recipes: [],
    type: "A",
    effect: "Increases your max number of minions by 1\nIncreases minion damage by 10%",
    obtain: "Mourning Wood"
  },
  {
    id: "hercules_beetle",
    name: "Hercules Beetle",
    path: "hercules_beetle.png",
    used_in: ["papyrus_scarab"],
    recipes: [],
    type: "A",
    effect: "Increases summon damage by 15%\nIncreases the knockback of your minions",
    obtain: "Mourning Wood"
  },
];
const allItems = [
  ...array,
  ...newItems,
];

const res = sort(allItems);
console.log(res);

/* todo add parsing count of items for recipes obsidian_skull = obsidian (20) maybe add column count */

// todo add another page with wings

fs.writeFileSync("./store2.json", JSON.stringify(res));