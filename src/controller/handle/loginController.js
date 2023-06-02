const fs = require('fs');
const qs = require('qs');
const registerService = require('../../service/registerService');
const loginService = require('../../service/loginService');
const connection = require('../../entity/connection');

class LoginController {
    connect = connection.getConnection();

    showFormLogin= async (req, res) => {
        if (req.method === "GET") {
            fs.readFile('./src/view/login_logout/login.html', "utf-8", (err, addHtml) => {
                if (err) throw err.message;
                res.write(addHtml);
                res.end();
            })
        } else {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            })
            req.on("end", async () => {
                let userInfo = qs.parse(data);
                await loginService.login(userInfo.username, userInfo.password) ? res.writeHead(301, {"location": "/home"}) : res.writeHead(301, {"location": "/signin"});
                res.end();
            })
        }
    }
}

module.exports = new LoginController()