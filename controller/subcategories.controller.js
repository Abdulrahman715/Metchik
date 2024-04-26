const SubCategory = require('../models/subcategory.model');

const { validationResult } = require("express-validator");

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');

const getAllSubCategories = asyncWrapper(
    async (req, res) => {
    
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const subCategories = await SubCategory.find({}, { "__v": false }).limit(limit).skip(skip);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            subCategories
        }
    });
}

)
const getSingleSubCategory = asyncWrapper(async(req, res,next) => {
    
    const subCategory = await SubCategory.findById(req.params.SubCategoryId);

    if (!subCategory) {
        const error = appError.create("this SubCategory not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            subCategory
        }
    });
});

const createSubCategory = asyncWrapper(async (req, res, next) => {
    
    const { title , category } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
        return next(error);
    }

    const url = `https://github.com/Abdulrahman715/Metchik/blob/main/uploads/${req.file.filename}?raw=true`;

    const newSubCategory = new SubCategory({
        title,
        category,
        avatar: url
    });
    await newSubCategory.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newSubCategory
        }
    });
});

const updateSubCategory = asyncWrapper(async(req, res) => {
    const SubCategoryId = req.params.SubCategoryId;

    let updatedSubCategory = await SubCategory.findByIdAndUpdate(SubCategoryId, { $set: { ...req.body } });

    if (!updatedSubCategory) {
        const error = appError.create("this SubCategory not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedSubCategory
        }
    });
});

const deleteSubCategory = asyncWrapper(async(req, res) => {
    await SubCategory.deleteOne({ _id: req.params.SubCategoryId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "SubCategory is deleted successfully"
    });
});

module.exports = {
    getAllSubCategories,
    getSingleSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}