
const asyncWrapper = require("../middleware/asyncWrapper");
const Favorite = require("../models/favorite.model");
const appError = require("../utils/appError");
const httpStatusText = require('../utils/httpStatusText');

// Add product to favorites
exports.addToFavorites = asyncWrapper(async (req, res, next) => {

    const { userId, productId } = req.query;


    // Check if the product is already in favorites
    const existingFavorite = await Favorite.findOne({ userId, productId });
    if (existingFavorite) {

        const error = appError.create("Product already in favorites", 400, httpStatusText.FAIL);
        return next(error);
    }

    
    const newFavoriteProduct = new Favorite({
        userId,
        productId,
    });
    await newFavoriteProduct.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: "Product added to favorites successfully"
    });
});


// Remove product from favorites
exports.removeFromFavorites = asyncWrapper(async (req, res) => {
    

    await Favorite.deleteOne({ _id: req.params.productId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "Product removed from favorites successfully"
    });
    
    // const { id } = req.params;
    // await Favorite.findByIdAndRemove(id);


    // res.status(200).json({
    //     status: httpStatusText.SUCCESS,
    //     message: "Product removed from favorites successfully"
    // });
});


// Get user's favorite products
exports.getFavorites = asyncWrapper(async (req, res) => {

    const { userId } = req.query;

    const favorites = await Favorite.find({ userId }).populate("productId");

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            userFavorites : favorites
        }
    });

});
