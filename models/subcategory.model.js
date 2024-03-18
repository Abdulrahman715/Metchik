const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'sub Category must be unique'],
        trim: true,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'sub Category must be belong to parent category'],
    }
});

module.exports = mongoose.model("SubCategory", subCategorySchema);