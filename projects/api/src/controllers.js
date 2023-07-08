import fs from "fs";
import path from "path";
import formidable from "formidable";
import { addItem } from "./services.js";
import { makeId } from "./helpers.js";

export const server = async (req, res) => {
	if (req.url === "/new" && req.method === "POST") {
		const dirname = path.join(path.resolve(), "../web/public/img");
		const uploadDir = path.join(path.resolve(), "../web/public/temp");
		const form = formidable({ uploadDir });
		const [fields, files] = await form.parse(req);
		const fileTempPath = files.img[0].filepath;
		const {
			name: [name],
			type: [type],
			usedIn: [usedIn],
			recipes: [recipes],
			effect: [effect],
			obtain: [obtain],
			category: [category],
		} = fields;
		const id = makeId(name);
		const { error } = addItem({
			name,
			id,
			type,
			usedIn: JSON.parse(usedIn),
			recipes: JSON.parse(recipes),
			effect,
			obtain,
			category: JSON.parse(category),
		});
		if (error) {
			console.error(error);
			return res.writeHead(400, { "Content-Type": "text/plain" }).end(error);
		}
		try {
			fs.renameSync(fileTempPath, path.join(dirname, `${id}.png`));
		} catch (e) {
			console.error(e);
			console.log("Temporary file path: ", fileTempPath);
			fs.rm(fileTempPath, { force: true }, (err) => {
				if (err) console.error(err);
			});
			res.writeHead(400, { "Content-Type": "text/plain" });
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
};
