const sshInfo = require("./sshInfo.js");
const node_ssh = require("node-ssh");
const ssh = new node_ssh();

const pullReadmes = async (keyLoc, db,arg) => {
    const connection = await ssh.connect(sshInfo.sshInfo(keyLoc));
    const data = await ssh.execCommand(sshInfo.sqlQuery(db, arg));
    const stringSplitArr = data.stdout.split("\n");
    const sqlColumnNames = stringSplitArr[0].split("\t");
    const readmeMySQLDataArr = stringSplitArr.reduce((accu,sqlDataString,i)=>{
        if (i>0) {
            const stringData = sqlDataString.split("\t");
            const newObj = {}
            for (let i = 0; i < stringData.length; i++) {
                newObj[sqlColumnNames[i]] = stringData[i];
            };
            accu.push(newObj);
        };
        return accu;
    },[]);
    ssh.dispose();
    return readmeMySQLDataArr;
};

module.exports = pullReadmes;
