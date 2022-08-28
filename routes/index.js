const userRouter = require("./user");

function route(app) {

    app.use("/auth", userRouter);

}

module.exports = route;