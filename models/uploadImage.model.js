const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        default:'uploads/profile.png'
    }
});

module.exports = mongoose.model("uploadImage", imageSchema);