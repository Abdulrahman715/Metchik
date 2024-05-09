
const express = require("express");
const router = express.Router();
const favoriteController = require('../controller/favorite.controller');


router.post("/add", favoriteController.addToFavorites);

router.delete("/remove/:productId", favoriteController.removeFromFavorites);

router.get("/list", favoriteController.getFavorites);

module.exports = router;
