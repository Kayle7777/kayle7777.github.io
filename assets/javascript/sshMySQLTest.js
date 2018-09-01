const { StringDecoder } = require("string_decoder");
const decoder = new StringDecoder('utf8');
const sqlobj = require("./sqlobj.js");
const mysql = require("mysql2/promise");
const ssh = require("ssh2").Client;
const conn = new ssh();

conn.on('ready', function() {
  console.log('Client :: ready');
  conn.exec(sqlobj.sshQuery('github_db', 'SELECT * FROM readmes'), (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
  }).on('data', (data) => {
      const decodedBufferData = decoder.write(data).split("\n");
      const sqlColumnNames = decodedBufferData[0].split("\t");
      const newArr = decodedBufferData.reduce((accu,sqlDataString,i)=>{
          if (i>0) {
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
  }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data);
    });
  });
}).connect(sqlobj.sqlobj());
