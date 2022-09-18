const Cart = require("../models/Cart");
const Post = require("../models/Post");

class CartController {



    //[POST] /cart/buy-product
    async buyProduct(req, res) {
        try {
            const { name, phone, adress, moreInfo, amount, postId } = req.body;

            const post = await Post.findById(postId);
            const cart = new Cart({
                name: name,
                phone: phone,
                adress: adress,
                moreInfo: moreInfo,
                amount: amount,
                post: {
                    postId: post._id,
                    title: post.title,
                    price : post.price ,
                    avatar : post.avatar ,
                },
                user: req.userId
            })
            await cart.save();

            res.json({
                success: true,
                msg: "Mua thành công",
                cart: cart
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Server error'
            })
        }
    }

    //[GET] /cart/get-cart
    async getCart(req, res) {
        try {
            if(req.userId === process.env.ID_ADMIN) {
                const cart = await Cart.find({});
                return res.json({
                    success: true,
                    msg: "Admin lấy thành công",
                    cart: cart,
                })
            }

            const cart = await Cart.findOne({user: req.userId});
            
            res.json({
                success: false,
                msg: "Lấy thành công",
                cart: cart
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: 'Server error'
            })
        }
    }

}

module.exports = new CartController();