const express = require("express");
const router = express.Router();

// lib
const upload = require("../lib/multer")

// middleware
const { dataRegister, dataLogin, dataUpdate } = require("../middleware/checkData");
const verifyToken = require("../middleware/verifyToken");

// controller
const UserController = require("../controllers/UserController");


router.post("/register", dataRegister, UserController.register);
router.post("/login", dataLogin, UserController.login);

router.post("/update", verifyToken, dataUpdate, UserController.updateUser);
router.post("/upload-avatar", verifyToken, upload.single("file"), UserController.uploadAvatar);

router.post("/buy-product", verifyToken, UserController.buyProduct);
router.delete("/delete-cart/:id", verifyToken, UserController.deleteCart);

router.post("/admin-delete-cart", verifyToken, UserController.adminDeleteCart);

router.get("/get-all-user", verifyToken, UserController.getAllUser);
router.get("/", verifyToken, UserController.checkUser);


module.exports = router;