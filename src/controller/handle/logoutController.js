const fs = require('fs')

class LogoutController {
    logout(req, res) {
        if (req.url === '/logout') {
            fs.unlink('./src/session/session.txt', (err) => {
                if (err) throw err.message;
                res.setHeader('Cache-Control','no-cache, no-store, must-revalidate')
                res.writeHead(301, {"location": "/login"});
                res.end();
            })
        }
    }
}

module.exports = new LogoutController();