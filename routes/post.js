const express = require("express");
const   router = express.Router();

// Lib
const upload = require("../lib/multer")

// Midleware
const verifyToken = require("../middleware/verifyToken")

const PostController = require("../controllers/PostController");


router.post("/create", PostController.createPost);

router.post("/upload-single-image", upload.single("file"), PostController.uploadSingleImage);
router.post("/upload-multiple-images", upload.array("files"), PostController.uploadMultipleImages);

router.get("/get-multiple-posts", PostController.getMultiplePosts);
router.get("/get-single-product/:id", PostController.getSingleProduct);
router.delete("/delete-single-post/:id", verifyToken, PostController.deleteSinglePost);


module.exports = router;