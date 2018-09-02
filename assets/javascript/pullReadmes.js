const sshInfo = require("./sshInfo.js");
const node_ssh = require("node-ssh");
const ssh = new node_ssh();

const pullReadmes = async (keyLoc, db,arg) => {
    const connection = await ssh.connect(sshInfo.sshInfo(keyLoc));
    const data = await ssh.execCommand(sshInfo.sqlQuery(db, arg));
    const stringSplitArr = data.stdout.split("\n");
    const sqlColumnNames = stringSplitArr.shift().split("\t");
    const readmeMySQLDataArr = stringSplitArr.map((sqlDataString,i)=>{
        const stringData = sqlDataString.split("\t");
        const newObj = {}
        for (let i = 0; i < stringData.length; i++) {
            stringData[i] === 'NULL'?stringData[i] = null:null;
            newObj[sqlColumnNames[i]] = stringData[i];
        };
        return newObj;
    });
    ssh.dispose();
    return readmeMySQLDataArr;
};
// pullReadmes("C:/users/Jesse/.ssh/id_rsa", "github_db", "select * from readmes").then(returnData=>console.log(returnData));
module.exports = pullReadmes;
