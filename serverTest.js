const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.TESTPORT || 3002;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

module.exports = app;
