const Category = require('../models/categories.model');

const { validationResult } = require("express-validator");

const httpStatusText = require('../utils/httpStatusText');

const getAllCategories = async (req, res) => {
    
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const categories = await Category.find({}, { "__v": false }).limit(limit).skip(skip);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            categories
        }
    });
};

const getSingleCategory = async(req, res) => {
    
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
        return res.status(404).json({
            status: httpStatusText.FAIL,
            data: null,
            message: "this category not found",
    });
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            category
        }
    });
};

const createCategory = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: httpStatusText.FAIL,
            data: null,
            message: errors.array(),
    });
    }

    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newCategory
        }
    });
};

const updateCategory = async(req, res) => {
    const categoryId = req.params.categoryId;

    let updatedCategory = await Category.findByIdAndUpdate(categoryId, { $set: { ...req.body } });

    if (!updatedCategory) {
        return res.status(404).json({
            status: httpStatusText.FAIL,
            data: null,
            message: "this category not found to update",
    });
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedCategory
        }
    });
};

const deleteCategory = async(req, res) => {
    await Category.deleteOne({ _id: req.params.categoryId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "category is deleted successfully"
    });
};

module.exports = {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
}