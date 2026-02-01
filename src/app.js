import express from 'express';
import db from './config/db.js';
import cors from 'cors';

import { initDB } from './config/initDB.js';
import { errorHandler } from './middleware/error.middleware.js';


const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5300'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);

initDB();

app.get('/', async (req, res) => {
  try {
    const [result] = await db.query('SELECT 1');
    if (result) res.send('Server and Database are connected!');
  } catch (err) {
    res.status(500).send({
      message: 'DB connection failed!',
      error: err.message,
    });
  }
});


app.use(errorHandler)


export default app;
