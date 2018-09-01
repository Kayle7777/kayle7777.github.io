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

 module.exports = sqlobj;
