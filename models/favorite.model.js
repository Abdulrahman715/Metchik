
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
