const express = require("express");
const router = express.Router();

// middleware
const { dataRegister, dataLogin } = require("../middleware/checkData");
// controller
const UserController = require("../controllers/UserController");


router.post("/register", dataRegister, UserController.register);
router.post("/login", dataLogin, UserController.login);


module.exports = router;