const fs = require('fs')

class LogoutController {
    logout(req, res) {
        if (req.url === '/logout') {
            fs.writeFile('./src/session/session.txt', '', (err) => {
                if (err) throw err.message;
                res.writeHead(301, {"location": "/home"});
                res.end();
            })
        }
    }
}

module.exports = new LogoutController();