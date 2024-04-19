const express = require('express');

const router = express.Router();

const categoriesController = require("../controller/categories.controller");
const upload = require("../middleware/multerConfig");

router.route('/')
    .get(categoriesController.getAllCategories)
    .post(upload.single('avatar'), categoriesController.createCategory);

router.route('/:categoryId')
    .get(categoriesController.getSingleCategory)
    .patch(categoriesController.updateCategory)
    .delete(categoriesController.deleteCategory);

module.exports = router;