import http from "http";

import { configuration } from "./app/config.js";
import { app } from "./app/index.js";
import { connect } from "./app/database.js";
import { lessonStatusThread } from "./app/lessonStatusThread.js";

const { port } = configuration.server;

// Connect to database
connect();
// Create web server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});

setInterval(lessonStatusThread, 1000);
