const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client/build')));
}

if (process.env.NODE_ENV === 'test') {
    module.exports = app;
} else {
    app.listen(PORT, function() {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
}
