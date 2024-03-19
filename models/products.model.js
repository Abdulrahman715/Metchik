const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'product must be unique'],
        trim: true,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
        minlength: [5, "too short description"],
        maxlength: [50, "too short description"],
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'product must be belong to parent category'],
    },
    subcategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
        required: [true, 'product must be belong to SubCategory'],
    }
});

module.exports = mongoose.model("Product", productsSchema);