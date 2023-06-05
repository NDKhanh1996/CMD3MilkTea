const connection = require("../entity/connection");

class ProductService {
    connect;
    constructor() {
        connection.connectToMySql()
        this.connect = connection.getConnection();
    }

    findById = (productId) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT p.*, categoryName FROM products p JOIN categories c ON p.categoryId = c.categoryId WHERE p.productId = ${productId};`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products[0])
                }

            })
        })
    }

    findAll = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT p.*, categoryName FROM products p JOIN categories c ON p.categoryId = c.categoryId;`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    productAdd = (products) => {
        console.log(products);
        return new Promise((resolve, reject) => {
            this.connect.query(`INSERT INTO products(productName, price, quantity, description, categoryId, image)
            VALUES("${products.productName}", ${products.price}, ${products.quantity}, "${products.description}", +${products.category}, "${products.image}");`, (err, addHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(addHtml)
                }
            })
        })
    }

    productDelete = (idDelete) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`DELETE FROM products WHERE productId = ${idDelete};`, (err, deleteHtml) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(deleteHtml)
                }
            })
        })
    }

    productEdit = (idEdit, newProduct) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`
            UPDATE products
            SET productName = "${newProduct.productName}", price = ${newProduct.price}, quantity = ${newProduct.quantity}, description = "${newProduct.description}", categoryId = ${newProduct.categoryId}, image = "${newProduct.image}" 
            WHERE productId = ${idEdit};`, (err, editHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(editHtml);
                }
            })
        })
    }

    findByName = (nameSearch) => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT p.*, categoryName FROM products p JOIN categories c ON p.categoryId = c.categoryId WHERE productName LIKE "%${nameSearch}%";`, (err, searchHtml) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(searchHtml);
                }
            })
        })
    }

    ascending = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM products ORDER BY price ASC`, (err, sortHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(sortHtml)
                }
            })
        })
    }

    descending = () => {
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM products ORDER BY price DESC`, (err, sortHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(sortHtml)
                }
            })
        })
    }

    searchByType = (id) => {
        console.log('da vao service')
        return new Promise((resolve, reject) => {
            this.connect.query(`SELECT * FROM products p JOIN categories c ON p.categoryId = c.categoryId WHERE c.categoryId = ${id}`, (err, searchHtml) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(searchHtml)
                }
            })
        })
    }
}


module.exports = new ProductService();