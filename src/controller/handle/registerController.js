const fs = require('fs');
const qs = require('qs');
const registerService = require('../../service/registerService');

class RegisterController {

    showFormSignIn = async (req, res) => {
        if (req.method === "GET") {
            fs.readFile('./src/view/login_logout/register.html', "utf-8", (err, addHtml) => {
                if (err) throw err.message;
                res.write(addHtml);
                res.end();
            })
        } else {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            })
            req.on("end", () => {
                let userInfo = qs.parse(data);
                registerService.registerAddToDb(userInfo.username, userInfo.password)
                res.writeHead(301, {"location": "/login"});
                res.end();
            })
        }
    }
}

module.exports = new RegisterController()