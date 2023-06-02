const connection = require("../entity/connection");

class RegisterService {
    connect = connection.getConnection();
    registerAddToDb(email, password) {
        return new Promise((resolve, reject) => {
            this.connect.query(`INSERT INTO users(email, PASSWORD)
 VALUES('${email}', '${password}'); `, (err, dataHtml) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dataHtml);
                }
            });
        });
    }
}

module.exports = new RegisterService();