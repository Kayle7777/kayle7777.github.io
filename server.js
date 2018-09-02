const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const pullReadmes = require("./assets/javascript/pullReadmes.js");

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
        return pullReadmes("C:/users/Jesse/.ssh/id_rsa", "github_db", "select * from readmes");
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
        return res.json(currentReadmes.readmes);
    } catch (err) {
        console.err(new Error(err));
    }
});

app.listen(PORT);
