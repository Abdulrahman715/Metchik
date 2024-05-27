const ProductContain = require('../models/productContain.model');

const { validationResult } = require("express-validator");

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');

const getAllProductDetails = asyncWrapper(
    async (req, res) => {
    
        const query = req.query;
        const productId = query.productId;

        const productContain = await ProductContain.find({ _id: productId });
        
        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: {
                productContain
            }
        });
});

const getSingleProductContain = asyncWrapper(async(req, res,next) => {
    
    const productContain = await ProductContain.findById(req.params.productId);

    if (!productContain) {
        const error = appError.create("this ProductContain not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            productContain
        }
    });
});

const createProductContain = asyncWrapper(async(req, res,next) => {
    
    const { _id, rating, review, description, productAttribute, imageUrl ,machineImage} = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
        return next(error);

    };

    const newProductContain = new ProductContain({
        _id,
        description,
        rating,
        review,
        productAttribute,
        imageUrl,
        machineImage
    });
    await newProductContain.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newProductContain
        }
    });
});

const updateProductContain = asyncWrapper(async(req, res) => {
    const productId = req.params.productId;

    let updatedProductContain = await ProductContain.findByIdAndUpdate(productId, { $set: { ...req.body } });

    if (!updatedProductContain) {
        const error = appError.create("this ProductContain not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedProductContain
        }
    });
});

const deleteProductContain = asyncWrapper(async(req, res) => {
    await ProductContain.deleteOne({ _id: req.params.productId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "ProductContain is deleted successfully"
    });
});

module.exports = {
    getAllProductDetails,
    getSingleProductContain,
    createProductContain,
    updateProductContain,
    deleteProductContain
}