const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        name: { type: String },
        phone: { type: String },
        adress: { type: String },
        moreInfo: { type: String },
        amount: { type: Number },
        post: {
            postId: { type: mongoose.Types.ObjectId, ref: "Post" },
            title: { type: String },
            price: { type: String },
            avatar: { type: String },
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = new mongoose.model("carts", CartSchema);
