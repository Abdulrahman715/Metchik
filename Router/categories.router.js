const express = require('express');

const router = express.Router();

const categoriesController = require("../controller/categories.controller");
const { validationSchema } = require('../middleware/validation');


router.route('/')
    .get(categoriesController.getAllCategories)
    .post(validationSchema(), categoriesController.createCategory);

router.route('/:categoryId')
    .get(categoriesController.getSingleCategory)
    .patch(categoriesController.updateCategory)
    .delete(categoriesController.deleteCategory);

module.exports = router;