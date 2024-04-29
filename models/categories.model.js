const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        default:'uploads/profile.png'
    },
    imageUrl: {
        type:String
    }
});

module.exports = mongoose.model('Category', categorySchema);