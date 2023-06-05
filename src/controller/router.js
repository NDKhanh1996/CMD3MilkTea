const productController = require("./handle/productController");

const registerController = require('./handle/registerController');
const loginController = require('./handle/loginController');
const pendingController = require('./handle/pendingController');
const categoryController = require('./handle/categoryController');


const router = {
    "home": productController.showHome,
    "add": productController.productAdd,
    "delete": productController.productDelete,
    "edit": productController.producEdit,
    "signin": registerController.showFormSignIn,
    "login": loginController.showFormLogin,
    "search": productController.productSearch,
    "pending": pendingController.showPendingList,
    "addCategory": categoryController.addCategory,
    "ascending": productController.ascending,
    "descending": productController.descending,
    "searchByType": productController.searchByTypes


  
    

}

module.exports = router;