const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder('utf8');
const sqlobj = require("./sqlobj.js");
const mysql = require("mysql2/promise");
const ssh = require("ssh2").Client;
const conn = new ssh();

const connInfo = {
    host: "173.174.69.53",
    port: 22,
    username: "jesse",
    privateKey: require("fs").readFileSync("C:\\Users\\Jesse\\.ssh\\id_rsa")
}

conn.on('ready', function() {
  console.log('Client :: ready');
  conn.exec('mysql --database=github_db --user="remote" -B --password="password" --execute="SELECT * FROM readmes"', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
  }).on('data', (data) => {
      const decodedBufferData = decoder.write(data).split("\n");
      const sqlColumnNames = decodedBufferData[0].split("\t");
      const newArr = decodedBufferData.reduce((accu,sqlDataString,i)=>{
          if (i>0) {
              // console.log(sqlColumnNames)
              const stringSplitArr = sqlDataString.split("\t");
              const newObj = {}
              for (var i = 0; i < stringSplitArr.length; i++) {
                  newObj[sqlColumnNames[i]] = stringSplitArr[i];
              };
              accu.push(newObj);
          };
          return accu;
      },[]);
      console.log(newArr);
      // console.log('STDIN: ' + data);
  }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect(connInfo);
