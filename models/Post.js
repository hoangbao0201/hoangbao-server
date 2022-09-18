const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: { type: String },
        description: { type: String },
        price: { type: Number },
        totalProduct: { type: Number },
        sold: { type: String },
        avatar: { type: String },
        listImages: [
            {
                type: String
            }
        ],
        // user: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
);

module.exports = new mongoose.model("posts", PostSchema);
