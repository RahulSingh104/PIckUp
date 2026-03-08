const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDb();

app.use(cors());  // this is to allow cross-origin requests, you can configure it as needed
app.use(express.json()); // this is to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // this is to parse URL-encoded bodies


app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log("Loading user routes...");

app.use('/users', userRoutes);

module.exports = app;