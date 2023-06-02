const fs = require('fs');
const qs = require('qs');
const RegisterService = require('../../service/registerService')
const connection = require('../../entity/connection')

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
            req.on("end", () => {
                let product = qs.parse(data);
                console.log(product)
                res.writeHead(301, {"location": "/home"});
                res.end();
            })
        }
    }
}

module.exports = new LoginController()