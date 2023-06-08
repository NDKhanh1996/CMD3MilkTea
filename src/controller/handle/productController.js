const fs = require("fs");
const qs = require("qs");
const url = require("url");
const productService = require("../../service/productService");
const categoryService = require('../../service/categoryService');
const loginService = require('../../service/loginService');
class ProductController {
    getHtmlProducts = (products, getHtml) => {
        let productHtml = "";
        products.map(item => {
            const editButtonId = `editButton_${item.productId}`;
            const deleteButtonId = `deleteButton_${item.productId}`;
            productHtml += `
                <div class="video anim" style="--delay: .4s; width:225px">
                    <div class="video-time" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" onclick="myButton('${item.productId}', '${item.productName}')">
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
                let category = await categoryService.findAll();
                let email = await loginService.getLoginInfo()
                indexHtml = this.getHtmlProducts(products, indexHtml);
                indexHtml = indexHtml.replace('{Email}',email.toString())
                category.forEach(categoryElement => {indexHtml = indexHtml.replace('<p id="category"></p>', `<a class="sidebar-link" href="/searchByType/${categoryElement.categoryId}" >
            <svg viewBox="0 0 24 24" fill="currentColor">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M15.164 6.083l.948.011c3.405 0 5.888 2.428 5.888 5.78v4.307c0 3.353-2.483 5.78-5.888 5.78A193.5 193.5 0 0112.01 22c-1.374 0-2.758-.01-4.122-.038-3.405 0-5.888-2.428-5.888-5.78v-4.307c0-3.353 2.483-5.78 5.898-5.78 1.286-.02 2.6-.04 3.935-.04v-.163c0-.665-.56-1.204-1.226-1.204h-.972c-1.109 0-2.012-.886-2.012-1.965 0-.395.334-.723.736-.723.412 0 .736.328.736.723 0 .289.246.52.54.52h.972c1.481.01 2.688 1.194 2.698 2.64v.183c.619 0 1.238.008 1.859.017zm-4.312 8.663h-1.03v1.02a.735.735 0 01-.737.723.728.728 0 01-.736-.722v-1.021H7.31a.728.728 0 01-.736-.723c0-.395.334-.722.736-.722h1.04v-1.012c0-.395.324-.723.736-.723.403 0 .736.328.736.723v1.012h1.03c.403 0 .737.327.737.722a.728.728 0 01-.736.723zm4.17-1.629h.099a.728.728 0 00.736-.722.735.735 0 00-.736-.723h-.098a.722.722 0 100 1.445zm1.679 3.315h.098a.728.728 0 00.736-.723.735.735 0 00-.736-.723H16.7a.722.722 0 100 1.445z" />
            </svg>
            ${categoryElement.categoryName}
           </a> <br> <p id="category"></p>`)})
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

    ascending = (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./src/view/index.html', 'utf-8', async (err, indexHtml) => {
                let products = await productService.ascending();
                indexHtml = this.getHtmlProducts(products, indexHtml)
                res.write(indexHtml);
                res.end();
            })
        }
    }

    descending = (req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./src/view/index.html', 'utf-8', async (err, indexHtml) => {
                let products = await productService.descending();
                indexHtml = this.getHtmlProducts(products, indexHtml)
                res.write(indexHtml);
                res.end();
            })
        }
    }

    searchByTypes = (req, res, id) => {
        console.log("da vao controller")
        if (req.method === 'GET') {
            fs.readFile('./src/view/index.html', 'utf-8', async (err, indexHtml) => {
                let products = await productService.searchByType(id);
                indexHtml = this.getHtmlProducts(products, indexHtml)
                res.write(indexHtml);
                res.end();
            })
        }
    }
}


module.exports = new ProductController();