import http from "http";
import { server } from "./src/controllers.js";

const PORT = process.env.SERVER_PORT || 3000;

const app = http.createServer(server);

app.listen(PORT, () => {
	console.log(`Server has been started on ${PORT}...`);
});
