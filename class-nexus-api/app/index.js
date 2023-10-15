import express from 'express';
import cors from 'cors';
import { router as api } from './api/v1/index.js';
export const app = express();

// CORS
app.use(cors());
// Parse JSON body
app.use(express.json());

app.use('/api', api);
app.use('/api/v1', api);

app.use('/api/uploads', express.static('uploads'));

// app.use('/api/v1/docs', swa)
app.use((req, res, next) => {
  next({
    message: 'Route Not Found',
    status: 404,
  });
});

app.use((err, req, res, next) => {
  /* Error handler */
  const { message = '', status = 500, error } = err;

  res.status(status);
  res.json({
    error: {
      message,
      status,
      error,
    },
  });
});
