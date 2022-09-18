const User = require("../models/User");
const Post = require("../models/Post");

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const cloudinary = require("../lib/cloudinary");

class UserController {
    //[GET] /auth
    async checkUser(req, res) {
        try {
            const user = await User.findById(req.userId).select("-password");
            if (!user) {
                return res.status(400).json({
                    success: false,
                    msg: "User not found",
                });
            }

            if (user.username === "admin") {
                return res.json({
                    success: true,
                    user,
                    admin: true,
                });
            }

            res.json({
                success: true,
                user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    //[POST] /auth/register
    async register(req, res) {
        const { name, username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.json({
                    success: false,
                    msg: "Tài khoản đã được sử dụng",
                });
            }

            // Hash password argon2
            const hashPassword = await argon2.hash(password);
            const newUser = new User({
                name: name,
                username: username,
                password: hashPassword,
            });
            await newUser.save();

            // tokens jsonwebtoken
            const accessToken = await jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            res.json({
                success: true,
                msg: "Tạo tài khoản thành công",
                accessToken,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    //[POST] /auth/login
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.json({
                    success: false,
                    msg: "Tài khoản hoặc mật khẩu không đúng",
                });
            }

            // verify password argon2
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.json({
                    success: false,
                    msg: "Tài khoản hoặc mật khẩu không đúng",
                });
            }
            // switch password token
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            res.json({
                success: true,
                msg: "Đăng nhập thành công",
                accessToken,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    //[GET] /auth/get-all-user
    async getAllUser(req, res) {
        try {
            const user = await User.findById(req.userId);

            if(!user.admin) {
                res.status(400).json({
                    success: false,
                    msg: 'Server error'
                })
            }

            const allUser = await User.find({});

            res.json({
                success: true,
                msg: "Lấy all user thành công",
                allUser: allUser,
                
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Server error'
            })
        }
    }

    // [POST] /auth/update
    async updateUser(req, res) {
        try {
            const { name, username, oldPassword, newPassword } = req.body;

            const user = await User.findOne({ _id: req.userId });

            const checkPassword = await argon2.verify(
                user.password,
                oldPassword
            );
            if (!checkPassword) {
                return res.json({
                    success: false,
                    msg: "Mật khẩu cũ không đúng",
                });
            }

            const hashPassword = await argon2.hash(newPassword);

            await User.updateOne(
                { _id: req.userId },
                {
                    name: name,
                    username: username,
                    password: hashPassword,
                }
            );

            const accessToken = await jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res.json({
                success: true,
                msg: "Cập nhật thành công",
                accessToken,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [POST] /auth/upload-avatar
    async uploadAvatar(req, res) {
        try {
            const user = await User.findById(req.userId);
            if (user.avatar.url) {
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }

            const avatar = await cloudinary.uploader.upload(req.file.path, {
                public_id: `${Date.now()}`,
                resource_type: "auto",
                folder: "images",
                // transformation: [
                //     {
                //         width: "200",
                //         height: "200",
                //     }
                // ]
            });

            await User.updateOne(
                { _id: req.userId },
                {
                    avatar: {
                        url: avatar.url,
                        public_id: avatar.public_id,
                    },
                }
            );

            res.json({
                success: true,
                msg: "Upload avatar thành công",
                user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    //[POST] /auth/buy-product
    async buyProduct(req, res) {
        try {
            const { name, phone, adress, moreInfo, amount, postId } = req.body;

            // .select("title", "avatar")
            const post = await Post.findById(postId).select(
                "title price avatar"
            );
            const user = await User.findByIdAndUpdate(
                req.userId,
                {
                    $push: {
                        cart: [
                            {
                                name: name,
                                phone: phone,
                                adress: adress,
                                moreInfo: moreInfo,
                                amount: amount,
                                post: {
                                    title: post.title,
                                    price: post.price,
                                    avatar: post.avatar,
                                }
                            },
                        ],
                    },
                },
                {
                    new: true,
                }
            );

            const adminUser = await User.findByIdAndUpdate(
                process.env.ID_ADMIN,
                {
                    $push: {
                        cart: [
                            {
                                idBuyer: req.userId,
                                name: name,
                                phone: phone,
                                adress: adress,
                                moreInfo: moreInfo,
                                amount: amount,
                                post: {
                                    title: post.title,
                                    price: post.price,
                                    avatar: post.avatar,
                                }
                            },
                        ],
                    },
                },
                {
                    new: true,
                }
            );

            res.json({
                success: true,
                msg: "Đặt mua thành công",
                user: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [DELETE] /auth/delete-cart/:id
    async deleteCart(req, res) {
        try {
            const id = req.params.id;

            // const user = await User.findById(req.userId);

            await User.findByIdAndUpdate( req.userId, {
                $pull: {
                    cart: {
                        _id: id
                    }
                }
            });

            res.json({
                success: true,
                msg: "Xóa thành công",
                user: user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Server error",
            });
        }
    }

    // [POST] /auth/admin-delete-cart
    async adminDeleteCart(req, res) {
        try {
            const { postId, userId } = req.body;
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Server error'
            })
        }
    }
}

module.exports = new UserController();
