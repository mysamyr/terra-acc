import fs from "fs";
import path from "path";
import formidable from "formidable";
import {addItem} from "./services.js";
import {makeId} from "./helpers.js";

export const server = async (req, res) => {
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
}