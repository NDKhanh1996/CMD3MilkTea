const productController = require("./handle/productController");
<<<<<<< HEAD
const registerController = require('./handle/registerController');
const loginController = require('./handle/loginController')
=======
>>>>>>> parent of db20b45... update pending sort

const router = {
    "home": productController.showHome,
    "add": productController.productAdd,
    "delete": productController.productDelete,
    "edit": productController.producEdit,
<<<<<<< HEAD
    "signin": registerController.showFormSignIn,
    "login": loginController.showFormLogin,
    "search": productController.productSearch

=======
    "search": productController.productSearch
    
>>>>>>> parent of db20b45... update pending sort
}

module.exports = router;