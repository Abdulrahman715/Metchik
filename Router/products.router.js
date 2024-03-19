const express = require('express');

const router = express.Router();

const productController = require("../controller/products.controller");
const { validationSchema } = require('../middleware/validation');


router.route('/')
    .get(productController.getAllProducts)
    .post(validationSchema(), productController.createProduct);

router.route('/:productId')
    .get(productController.getSingleProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;