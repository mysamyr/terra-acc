import http from "http";
import fs from "fs";
import formidable from "formidable";
import accessories from "../src/store/store2.json" assert {type: "json"};
import path from "path";

const makeId = (string) => {
  if (typeof string === 'string') {
    const res = string.trim().toLowerCase().replaceAll(" ", "_");
    if (res.length) return res;
  }
};

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

const addItem = ({name, id, type, usedIn, effect, obtain}) => {
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

const server = http.createServer(async (req, res) => {
  if (req.url === "/new" && req.method === "POST") {
    const dirname = path.join(path.resolve(), "../public/temp");
    const form = formidable();
    const [fields, files] = await form.parse(req);
    const {name: [name], type: [type], usedIn: [usedIn], effect: [effect], obtain: [obtain]} = fields;
    const id = makeId(name);
    const {error} = addItem({name, id, type, usedIn: usedIn.split("/"), effect, obtain});
    if (error) {
      console.error(error);
      res.writeHead(400);
      return res.end(error);
    }
    try {
      fs.renameSync(files.img[0].filepath, path.join(dirname, `${id}.png`));
    } catch (e) {
      console.error(e)
      res.writeHead(400);
      return res.end(e);
    }
    res.writeHead(201);
    return res.end();
  } else if (req.url === "/img" && req.method === "POST") {
    // temporary for testing
    const form = formidable({
      uploadDir: path.join(path.resolve(), "../public/temp"),
      keepExtensions: true,
    });
    // const [fields, files] = await form.parse(req);
    await form.parse(req);

    res.writeHead(201);
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.SERVER_PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}...`);
});
