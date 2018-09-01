// ssh -N -p 22 homeaway -L 33306:localhost:3306
 const sqlobj = (arg) => {
    return {
        host: "localhost",
        port: 33306,
        user: "remote",
        password: "password",
        database: arg
    }
};

const sshQuery = (db, arg) => {
    return `mysql --database='${db}' --user="remote" -B --password="password" --execute='${arg}'`
}

 module.exports = {
    sqlobj: sqlobj,
    sshQuery: sshQuery
 };
