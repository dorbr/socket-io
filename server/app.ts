import express from 'express';
import cors from 'cors';
import path from 'path';

import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from './utils/middleware';

import messagesRouter from './src/routers/messagesRouter'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, "../client/build"))); 

app.use(requestLogger);

app.get('/', function(req, res) {
  res.sendFile("./build/index.html", { root:__dirname });
});
app.use('/messages', messagesRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export { app };
