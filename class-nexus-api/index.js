import http from "http";

import { configuration } from "./app/config.js";
import { app } from "./app/index.js";
import { connect } from "./app/database.js";
import {
  lessonExpiredStatusThread,
  lessonFinishedStatusThread,
} from "./app/statusThread.js";

const { port } = configuration.server;

// Connect to database
connect();
// Create web server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});

setInterval(lessonExpiredStatusThread, 30 * 1000); // Every 30 seconds
lessonFinishedStatusThread();
// setInterval(lessonFinishedStatusThread, 1000); // Every second, should be avery 5 minutes
