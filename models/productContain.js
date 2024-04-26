const mongoose = require("mongoose");

// Define schema for product attribute
const ProductAttributeSchema = new mongoose.Schema({
    sizes: String,
    availableInStock: [Number],
    colors: [String],
});

// Define schema for product
const ProductSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    images: [String],
    rating: Number,
    review: Number,
    productAttribute: [ProductAttributeSchema], // Embedded schema
    description: String,
});

// Create a model
const ProductContain = mongoose.model("ProductContain", ProductSchema);

module.exports = ProductContain;