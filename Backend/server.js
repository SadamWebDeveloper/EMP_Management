
import http from "http";
import app from "./src/app.js";
import { getConfig } from "./src/utils/helper.js";

const config = getConfig();
const host = config.host
const port = config.port;

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Server running on port ${port}`);
});

