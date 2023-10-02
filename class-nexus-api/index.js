import http from 'http';

import { configuration } from './app/config.js';
import { app } from './app/index.js';
import { connect } from './app/database.js';
import {
  lessonExpiredStatusThread,
  lessonFinishedStatusThread,
  lessonNotStartedStatusThread,
} from './app/statusThread.js';

const { port } = configuration.server;

// Connect to database
connect();
// Create web server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});

setInterval(lessonExpiredStatusThread, 2 * 60 * 1000); // Every 2 minutes
setInterval(lessonFinishedStatusThread, 2 * 60 * 1000);
setInterval(lessonNotStartedStatusThread, 2 * 60 * 1000);
