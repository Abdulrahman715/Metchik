const express = require('express');

const router = express.Router();

const subCategoriesController = require("../controller/subcategories.controller");
const upload = require("../middleware/multerConfig");

router.route('/')
    .get(subCategoriesController.getAllSubCategories)
    .post(upload.single('avatar'), subCategoriesController.createSubCategory);

router.route('/:SubCategoryId')
    .get(subCategoriesController.getSingleSubCategory)
    .patch(subCategoriesController.updateSubCategory)
    .delete(subCategoriesController.deleteSubCategory);

module.exports = router;