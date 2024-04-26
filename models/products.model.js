const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:'uploads/profile.png'
    },
    shortDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Product", productsSchema);