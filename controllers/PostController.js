const Post = require("../models/Post");

// Lib
const cloudinary = require("../lib/cloudinary");

class PostController {
    // [POST] /post/create
    async createPost(req, res) {
        try {
            const {
                title,
                description,
                price,
                totalProduct,
                avatar,
                listImages,
            } = req.body;

            const post = new Post({
                title: title,
                description: description,
                price: price,
                totalProduct: totalProduct,
                sold: 0,
                avatar: avatar,
                listImages: listImages,
            });
            await post.save();

            res.json({
                success: true,
                msg: "Đăng bài thành công",
                post: post,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [GET] /post/get-multiple-posts
    async getMultiplePosts(req, res) {
        try {
            const posts = await Post.find({});
            res.json({
                success: true,
                msg: "Đăng bài thành công",
                posts,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [POST] /post/upload-image
    async uploadSingleImage(req, res) {
        try {
            const image = await cloudinary.uploader.upload(req.file.path, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "images",
            });

            res.json({
                success: true,
                msg: "Upload thành công",
                image: image.url,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [POST] /post/upload-multiple-images
    async uploadMultipleImages(req, res) {
        try {
            let filesArray = [];
            for (let i = 0; i < req.files.length; i++) {
                const image = await cloudinary.uploader.upload(
                    req.files[i].path,
                    {
                        public_id: `${Date.now()}`,
                        resource_type: "auto",
                        folder: "images",
                    }
                );
                filesArray.push(image.url);
            }

            res.json({
                success: true,
                msg: "Upload thành công",
                images: filesArray,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    //[GET] /post/product/:id
    async getSingleProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await Post.findById(id);

            res.json({
                success: true,
                msg: "Lấy sản phẩm thành công",
                product: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [DELETE] /post/delete-single-post/:id
    async deleteSinglePost(req, res) {
        try {
            const postId = req.params.id;

            const post = await Post.findByIdAndDelete(postId);
            if (!post) {
                return res.json({
                    success: false,
                    msg: "Xóa sản phẩm thất bạn, vui lòng tải lại trang",
                });
            }

            res.json({
                success: true,
                msg: "Xóa thành công",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    //[PUT] /post/edit-post
    async editPost(req, res) {
        try {
            const {
                postId,
                title,
                description,
                price,
                totalProduct,
                avatarProduct,
                listImagesProduct,
            } = req.body;
            const post = await Post.findByIdAndUpdate(postId, {
                title: title,
                description: description,
                price: price,
                totalProduct: totalProduct,
                sold: 0,
                avatar: avatarProduct,
                listImages: listImagesProduct,
            });
            if (!post) {
                return res.json({
                    success: false,
                    msg: "Chỉnh sữa sản phẩm thất bạn, vui lòng tải lại trang",
                });
            }

            res.json({
                success: true,
                msg: "Chỉnh sữa thành công",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    
}

module.exports = new PostController();
