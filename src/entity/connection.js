const mysql = require("mysql");
class Connection {
    configToMySql = {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "case_md3",
        charset: "utf8_general_ci"
    }

    getConnection = () => {
        return mysql.createConnection(this.configToMySql)
    }

    connectToMySql = () => {
        this.getConnection().connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Connect database success");
            }
        })
    }
}

module.exports = new Connection();
