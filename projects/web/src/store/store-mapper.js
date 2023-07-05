const accessories = require("./store.json");
const fs = require("fs");

const pipe = (first, ...more) => more.reduce((acc, curr) => (...arguments) => curr(acc(...arguments)), first);

const objToArr = (obj) => Object.values(obj);
const arrayToObj = (arr) => arr.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
const sortById = (arr) =>
  arr.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });

const res = pipe(objToArr, sortById, arrayToObj)(accessories);
console.log(res);

fs.writeFileSync("./store.json", JSON.stringify(res));