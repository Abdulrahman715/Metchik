const Product = require('../models/products.model');

const { validationResult } = require("express-validator");

const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const appError = require('../utils/appError');

const getAllProducts = asyncWrapper(
    async (req, res) => {
    
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const products = await Product.find({}, { "__v": false }).limit(limit).skip(skip);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            products
        }
    });
    })


const getSingleProduct = asyncWrapper(async(req, res,next) => {
    
    const product = await Product.findById(req.params.productId);

    if (!product) {
        const error = appError.create("this Product not found", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            product
        }
    });
});

const createProduct = asyncWrapper(async(req, res,next) => {
    
    const { title, shortDescription, price, category, subCategory } = req.body;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
        return next(error);

    }

    const url = `https://github.com/Abdulrahman715/Metchik/blob/main/uploads/${req.file.filename}?raw=true`;


    const newProduct = new Product({
        title,
        shortDescription,
        price,
        category,
        subCategory,
        avatar: url
    });
    await newProduct.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            newProduct
        }
    });
});

const updateProduct = asyncWrapper(async(req, res) => {
    const productId = req.params.productId;

    let updatedProduct = await Product.findByIdAndUpdate(productId, { $set: { ...req.body } });

    if (!updatedProduct) {
        const error = appError.create("this Product not found to update", 404, httpStatusText.FAIL);
        return next(error);
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            updatedProduct
        }
    });
});

const deleteProduct = asyncWrapper(async(req, res) => {
    await Product.deleteOne({ _id: req.params.productId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "Product is deleted successfully"
    });
});

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}