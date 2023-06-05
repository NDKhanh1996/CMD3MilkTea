const connection = require("../entity/connection");

class CategoryService {
    connect;

    constructor() {
        connection.connectToMySql()
        this.connect = connection.getConnection();
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM categories;`, (err, categories) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(categories)
                }
            })
        })
    }

    addCategory(categoryWantToAdd){
        this.connect.query(`insert into categories (categoryName) values ('${categoryWantToAdd}');`)
    }
}

module.exports = new CategoryService();