const mysql = require("mysql2/promise");
const sqlobj = require("./sqlobj.js");

const sqlTrans = async (db, query) => {
    const connection = await mysql.createConnection(sqlobj(db));
    try {
        this.query = await connection.execute(query);
        this.success = true;
        connection.end();
    } catch (error) {
        connection.end();
        this.success = false;
        console.err(new Error(error));
    };
    return this;
};

module.exports = sqlTrans;
