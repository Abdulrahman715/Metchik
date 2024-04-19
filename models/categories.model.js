const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'main Category must be unique'],
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        default:'uploads/profile.png'
    }
});

module.exports = mongoose.model('Category', categorySchema);