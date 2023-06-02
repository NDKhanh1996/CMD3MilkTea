const productController = require("./handle/productController");
const registerController = require('./handle/registerController');
const loginController = require('./handle/loginController')

const router = {
    "home": productController.showHome,
    "add": productController.productAdd,
    "delete": productController.productDelete,
    "edit": productController.producEdit,
    "signin": registerController.showFormSignIn,
    "login": loginController.showFormLogin,
    "search": productController.productSearch

}

module.exports = router;