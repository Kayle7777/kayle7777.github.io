const sqlTrans = require("./sqltrans.js");

const mysqlPullReadmes = async() => {
    return sqlTrans("github_db", "SELECT * FROM readmes");
};

module.exports = mysqlPullReadmes;
