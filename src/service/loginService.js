const connection = require("../entity/connection");

class LoginService {
    connect = connection.getConnection();

    async login(email, password) {
        try {
            let userList = await new Promise((resolve, reject) => {
                this.connect.query(`SELECT * FROM case_md3.users; `, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            let loginComplete = false;
            for (let userListElement of userList) {
                if (userListElement.email === email && userListElement.password === password) {
                    loginComplete = true;
                    break;
                }
            }
            return loginComplete
        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = new LoginService();