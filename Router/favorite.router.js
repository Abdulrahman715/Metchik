
const express = require("express");
const router = express.Router();
const favoriteController = require('../controller/favorite.controller');


router.get("/add", favoriteController.addToFavorites);

router.delete("/remove", favoriteController.removeFromFavorites);

router.get("/list", favoriteController.getFavorites);

module.exports = router;
