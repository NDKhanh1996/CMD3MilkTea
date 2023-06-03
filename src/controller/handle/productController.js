const fs = require("fs");
const qs = require("qs");
const url = require("url");
const productService = require("../../service/productService")
const categoryService = require('../../service/categoryService')
class ProductController {
    getHtmlProducts = (products, getHtml) => {
        let productHtml = "";
        products.map(item => {
            const editButtonId = `editButton_${item.productId}`;
            const deleteButtonId = `deleteButton_${item.productId}`;
            productHtml += `
                <div class="video anim" style="--delay: .4s; width:225px">
                    <div class="video-time" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" onclick="myButton(${item.productId}, ${item.productName})">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </div>
                    <div class="video-wrapper">
                        <img style="width:274px; height:250px" src="${item.image}">
                    </div>
                    <div>
                        <div class="video-name">${item.productName}</div>
                        <div class="video-view">$${item.price}</div>
                    </div>
                    <div style="display: flex; justify-content: center; padding-bottom: 10px; column-gap: 10px;">
                        <a type="button" class="btn btn-outline-info" href="/edit/${item.productId}" id="${item.productId}" style="display: none;">Edit</a>
                        <a type="button" class="btn btn-outline-warning" href="/delete/${item.productId}" id="${item.productName}" style="display: none;">Delete</a>
                    </div>
                </div>

                <script>
                    function myButton(productId, price) {
                        let editButton = document.getElementById(productId);
                        let deleteButton = document.getElementById(price);
                        editButton.style.display = editButton.style.display === "none" ? "inline-block" : "none";
                        deleteButton.style.display = deleteButton.style.display === "none" ? "inline-block" : "none";
                    }
                </script>
            `
        });
        
        getHtml = getHtml.replace("{productList}", productHtml);
        return getHtml;
    }

    showHome = async (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./src/view/index.html', 'utf-8', async (err, indexHtml) => {
                let products = await productService.findAll();
                indexHtml = this.getHtmlProducts(products, indexHtml);
                res.write(indexHtml);
                res.end();
            })
        }
    }

    productAdd = async (req, res) => {
        if (req.method === "GET") {
            let category = await categoryService.findAll()
            fs.readFile("./src/view/product/add.html", "utf-8", (err, addHtml) => {
             let categoryHtml = ""
             category.map(item => {
                categoryHtml += `<option value="${item.categoryId}">${item.categoryName}</option>`
             })
             addHtml = addHtml.replace("{categories}", categoryHtml)
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
                productService.productAdd(product);
                res.writeHead(301, {"location": "/home"});
                res.end();
            })
        }
    }

    productDelete = (req, res, idDelete) => {
        productService.productDelete(idDelete);
        res.writeHead(301, {"location": "/home"});
        res.end();
    }

    producEdit = (req, res,idEdit) => {
        if (req.method === "GET") {
            fs.readFile("./src/view/product/edit.html", "utf-8", async (err, editHtml) => {
                let products = await productService.findById(idEdit);
                let categories = await categoryService.findAll();
                editHtml = editHtml.replace("{productName}", products.productName);
                editHtml = editHtml.replace("{price}", products.price);
                editHtml = editHtml.replace("{quantity}", products.quantity);
                editHtml = editHtml.replace("{description}", products.description);
                let productHtml = "";
                categories.map(item => {
                    productHtml += `<option value="${item.categoryId}">${item.categoryName}</option>`
                });
                editHtml = editHtml.replace("{categories}", productHtml);
                res.write(editHtml);
                res.end();
            })
        } else {
            let data = ""
            req.on("data", chunk => {
                data += chunk;
            })
            req.on("end", () => {
                let products = qs.parse(data);
                productService.productEdit(idEdit, products);
                res.writeHead(301, {"location": "/home"});
                res.end()
            })
        }
    }

    productSearch = async (req, res) => {
        if (req.method === "POST") {
            let data = "";
            req.on("data", chunk => {
                data += chunk;
            })
            req.on("end" , async () => {
                let products = qs.parse(data)
                await productService.findByName(products.searchInput);
                fs.readFile("./src/view/index.html", "utf-8", async (err, indexHtml) => {
                    let product = await productService.findByName(products.searchInput)
                    indexHtml = this.getHtmlProducts(product, indexHtml)                  
                    res.write(indexHtml)
                    res.end()
                })
            })
        }
    }
}


module.exports = new ProductController();