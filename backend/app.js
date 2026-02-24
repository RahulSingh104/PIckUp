const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');

connectToDb();

app.use(cors());  // this is to allow cross-origin requests, you can configure it as needed
app.use(express.json()); // this is to parse JSON bodies



app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;