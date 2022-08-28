const express = require("express");
const app = express();

const PORT = 5000;


app.get("/", (req, res) => {
    res.json({
        name: "bao"
    })
})

app.listen(PORT, () => {
    console.log(`Example add listening as https://localhost:${PORT}`);
})