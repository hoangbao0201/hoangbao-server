const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        admin: Boolean,
        name: { type: String, require: true },
        username: { type: String, require: true },
        password: { type: String, require: true },
        avatar: {
            url: { type: String },
            public_id: { type: String },
        },
        cart: [
            {
                idBuyer: { type: String },
                name: { type: String },
                phone: { type: String },
                adress: { type: String },
                moreInfo: { type: String },
                amount: { type: Number },
                post: {
                    title: { type: String },
                    price: { type: Number },
                    avatar: { type: String },
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = new mongoose.model("users", UserSchema);
