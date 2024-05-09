
const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart.controller");

router.post("/add", cartController.addToCart);

router.delete("/remove/:productId", cartController.removeFromCart);

router.patch("/update/:productId", cartController.updateCartItemQuantity);

router.get("/view", cartController.viewCart);

module.exports = router;
