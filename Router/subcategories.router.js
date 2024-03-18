const express = require('express');

const router = express.Router();

const subCategoriesController = require("../controller/subcategories.controller");
const { validationSchema } = require('../middleware/validation');


router.route('/')
    .get(subCategoriesController.getAllSubCategories)
    .post(validationSchema(), subCategoriesController.createSubCategory);

router.route('/:SubCategoryId')
    .get(subCategoriesController.getSingleSubCategory)
    .patch(subCategoriesController.updateSubCategory)
    .delete(subCategoriesController.deleteSubCategory);

module.exports = router;