const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:'uploads/profile.png'
    },
    category: {
        type: String,
        required: [true, 'sub Category must be belong to parent category'],
    },
    imageUrl: {
        type: String
    }
});

module.exports = mongoose.model("SubCategory", subCategorySchema);