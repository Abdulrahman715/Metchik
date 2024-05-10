const Category = require('../models/categories.model');

const { validationResult } = require("express-validator");

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');

const getAllCategories = asyncWrapper(
    async (req, res) => {
    
    const query = req.query;
    const limit = query.limit || 100;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const categories = await Category.find({}, { "__v": false }).limit(limit).skip(skip);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            categories
        }
    });
}

)
const getSingleCategory = asyncWrapper(async(req, res,next) => {
    
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
        const error = appError.create("this category not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            category
        }
    });
});

const createCategory = asyncWrapper(async(req, res,next) => {
    const { title, imageUrl } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
        return next(error);
    }

    const url = `https://github.com/Abdulrahman715/Metchik/blob/main/uploads/${req.file.filename}?raw=true`;

    const newCategory = new Category({
        title,
        avatar: url,
        imageUrl
    });

    await newCategory.save();


    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newCategory
        }
    });
});

const updateCategory = asyncWrapper(async(req, res) => {
    const categoryId = req.params.categoryId;

    let updatedCategory = await Category.findByIdAndUpdate(categoryId, { $set: { ...req.body } });

    if (!updatedCategory) {
        const error = appError.create("this category not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedCategory
        }
    });
});

const deleteCategory = asyncWrapper(async(req, res) => {
    await Category.deleteOne({ _id: req.params.categoryId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "category is deleted successfully"
    });
});

module.exports = {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
}