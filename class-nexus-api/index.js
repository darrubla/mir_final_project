import http from "http";

import { configuration } from "./app/config.js";
import { app } from "./app/index.js";
import { connect } from "./app/database.js";
import {
  lessonExpiredStatusThread,
  lessonFinishedStatusThread,
  lessonNotStartedStatusThread,
} from "./app/statusThread.js";

const { port } = configuration.server;

// Connect to database
connect();
// Create web server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});

setInterval(lessonExpiredStatusThread, 60 * 1000); // Every minute
setInterval(lessonFinishedStatusThread, 60 * 1000);
setInterval(lessonNotStartedStatusThread, 60 * 1000);
