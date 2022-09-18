const userRouter = require("./user");
const postRouter = require("./post");
const cartRouter = require("./cart");

function route(app) {

    app.use("/auth", userRouter);
    app.use("/post", postRouter);
    app.use("/cart", cartRouter);


    // /post/create
    // /post/get-multiple-posts
    // /post/upload-image
    // /post/upload-multiple-images
    // post/delete-single-post/:id
    // /post/edit-post
    // /post/product/:id

    // /auth
    // /auth/register
    // /auth/login
    // /auth/update
    // /auth/upload-avatar
    // /auth/buy-product/:id
    // /auth/cart-product/:id

}

module.exports = route;