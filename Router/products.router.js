const express = require('express');

const router = express.Router();

const productController = require("../controller/products.controller");
const { validationSchema } = require('../middleware/validation');
const verifyToken = require('../middleware/verifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');


router.route('/')
    .get(productController.getAllProducts)
    .post(validationSchema(), productController.createProduct);

router.route('/:productId')
    .get(productController.getSingleProduct)
    .patch(productController.updateProduct)
    .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), productController.deleteProduct);

module.exports = router;