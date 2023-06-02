const productController = require("./handle/productController");

const router = {
    "home": productController.showHome,
    "add": productController.productAdd,
    "delete": productController.productDelete,
    "edit": productController.producEdit
    
}

module.exports = router;