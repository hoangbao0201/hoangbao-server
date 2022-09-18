const express = require("express");
const router = express.Router();

const CartController = require("../controllers/CartController");

//Middleware
const verifyToken = require("../middleware/verifyToken");



router.post("/buy-product", verifyToken, CartController.buyProduct);
router.get("/get-cart", verifyToken, CartController.getCart);



module.exports = router;