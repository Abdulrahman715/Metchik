const express = require('express');

const router = express.Router();

const productContain = require("../controller/productContainController");


router.route('/')
    .get(productContain.getAllProductDetails)
    .post(productContain.createProductContain);

router.route('/:productId')
    .get(productContain.getSingleProductContain)
    .patch(productContain.updateProductContain)
    .delete(productContain.deleteProductContain);

module.exports = router;