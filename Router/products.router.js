const express = require('express');

const router = express.Router();

const productController = require("../controller/products.controller");
const verifyToken = require('../middleware/verifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');
const upload = require('../middleware/multerConfig');

router.route('/')
    .get(productController.getAllProducts)
    .post(upload.single('avatar'), productController.createProduct);

router.route('/:productId')
    .get(productController.getSingleProduct)
    .patch(productController.updateProduct)
    .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), productController.deleteProduct);

module.exports = router;