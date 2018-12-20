const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
app.use(routes);
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, function() {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
} else {
    module.exports = app;
}
