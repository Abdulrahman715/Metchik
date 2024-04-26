const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'product must be unique'],
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        default:"uploads/profile.png"
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
        type: String,
        required: "true",
    },
    subCategory: {
        type: String,
        required: "true",
    },
});

module.exports = mongoose.model("Product", productsSchema);