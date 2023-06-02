const fs = require("fs")
class ErrorController {
    showNotFound = (req, res) => {
        fs.readFile("./src/view/error/notFound.html", "utf-8", (err, notFoundHtml) => {
            res.write(notFoundHtml)
            res.end();
        })
    }
}

module.exports = new ErrorController();