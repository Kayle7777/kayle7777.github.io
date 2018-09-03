// ssh -N -p 22 homeaway -L 33306:localhost:3306
 const sshInfo = (keyLoc) => {
    return {
        host: "173.174.69.53",
        port: 22,
        username: "jesse",
        privateKey: keyLoc
    }
};

const sqlQuery = (db, arg) => {
    return `mysql --database='${db}' --user="remote" -B --password="password" --execute='${arg}'`
}

 module.exports = {
    sshInfo: sshInfo,
    sqlQuery: sqlQuery
 };
