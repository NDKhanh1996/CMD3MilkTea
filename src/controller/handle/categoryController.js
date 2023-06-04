const fs = require('fs');

class CategoryController {
    category (req, res) {
        fs.readFile('./src/view/index.html', "utf-8", (err, data) => {
            res.write(data)
            res.end();
        })
    }
}