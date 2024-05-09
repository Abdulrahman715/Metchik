
const asyncWrapper = require("../middleware/asyncWrapper");
const Cart = require("../models/cart.model");
const httpStatusText = require('../utils/httpStatusText');


exports.addToCart = asyncWrapper(async (req, res) => {

    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }


    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += 1;
    } else {
        cart.items.push({ productId });
    }
    await cart.save();

    res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: "Product added to cart successfully",
    });
});


exports.removeFromCart = asyncWrapper(async (req, res) => {

    await Favorite.deleteOne({ _id: req.params.productId });

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: null,
        message: "Product removed from cart successfully",
    });
});


exports.updateCartItemQuantity = asyncWrapper(async (req, res) => {
    
    const { id } = req.params;
    const { userId, quantity } = req.body;


    await Cart.findOneAndUpdate(
        { userId, "items._id": id },
        { $set: { "items.$.quantity": quantity } }
    );


    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "Cart item quantity updated successfully"
    });
});


exports.viewCart = asyncWrapper(async (req, res) => {
    const { userId } = req.query;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            cart
        }
    });
});
