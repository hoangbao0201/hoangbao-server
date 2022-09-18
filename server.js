require("dotenv").config();

const express = require("express");
const app = express();
const route = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 5000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://hoangbao-shop:baodeptrai199@hoangbao-shop.ffed83u.mongodb.net/?retryWrites=true&w=majority`,
            // `mongodb://localhost:27017`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB connect");
    } catch (error) {
        console.log(error.message);
    }
};
connectDB();


app.use(cors());
route(app);

app.listen(PORT, () => {
    console.log(`Example add listening as https://localhost:${PORT}`);
});
