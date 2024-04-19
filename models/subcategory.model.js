const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'sub Category must be unique'],
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        default:'uploads/profile.png'
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'sub Category must be belong to parent category'],
    }
});

module.exports = mongoose.model("SubCategory", subCategorySchema);