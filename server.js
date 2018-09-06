const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sqlTrans = require("./assets/javascript/sqltrans.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/views', express.static('./assets/views',{index:"index.html"}));
app.use('/css', express.static('./assets/css'));

class Readme {
    constructor() {
        this.readmes = [];
    };
    static async readmeGetter() {
        return sqlTrans("github_db", "SELECT * FROM readmes");
    };
};
const currentReadmes = new Readme();


app.get('/projects', (req,res)=>{
    res.sendFile(path.join(__dirname,'/assets/views/projects.html'));
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'/assets/views/index.html'));
});

app.get('/contact', (req,res)=>{
    res.sendFile(path.join(__dirname,'/assets/views/contact.html'));
});

app.get('/api/readmes', async (req,res)=>{
    try {
        currentReadmes.readmes = await Readme.readmeGetter();
        return res.json(currentReadmes.readmes.query[0]);
    } catch (err) {
        console.err(new Error(err));
    }
});
app.listen(PORT, '0.0.0.0', function() {
    console.log('Listening to port:  ' + PORT);
});
