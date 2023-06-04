const fs = require('fs');
const qs = require('qs');
const categoryService = require('../../service/categoryService');

class CategoryController {
    addCategory(req, res) {
        if (req.method === 'POST' && req.url === '/addCategory') {
            let data = '';
            req.on("data", chunk => {
                data += chunk;
            })
            req.on("end", () => {
                data = qs.parse(data);
                categoryService.addCategory(data.categoryName);
                res.writeHead(301, {"location": "/home"});
                res.end();
            })
        }
    }
}

module.exports = new CategoryController();