const connection = require("../entity/connection");
const fs = require('fs')

class LoginService {
    connect = connection.getConnection();
    loginInfoName = '';

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
                if (userListElement.email === email && userListElement.password === password && userListElement.active === 1) {
                    loginComplete = true;
                    this.loginInfoName = userListElement.email
                    break;
                }
            }
            return loginComplete
        } catch (err) {
            console.log(err.message)
        }
    }

    getLoginInfo() {
        return new Promise((resolve, reject) => {
            fs.readFile('./src/session/session.txt', "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}

module.exports = new LoginService();