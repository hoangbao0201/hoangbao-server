

const dataRegister = (req, res, next) => {
    const { name, username, password, rePassword } = req.body;
    // check data
    if (!name || !username || !password || !rePassword) {
        return res.status(400).json({
            success: false,
            msg: "Bạn chưa điền đầy đủ thông tin",
        });
    }
    //check name
    if (name.length > 40) {
        return res.status(400).json({
            success: false,
            msg: "Tên quá dài",
        });
    }
    if (name.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Tên quá ngắn",
        });
    }
    // check username
    if (username.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Tài khoản quá dài",
        });
    }
    if (username.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Tài khoản quá ngắn",
        });
    }
    // check password
    if (password.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu quá dài",
        });
    }
    if (password.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu quá ngắn",
        });
    }
    if (password !== rePassword) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu không giống nhau",
        });
    }

    next();
}
const dataLogin = (req, res, next) => {
    const { username, password } = req.body;
    // check data
    if ( !username || !password ) {
        return res.status(400).json({
            success: false,
            msg: "Bạn chưa điền đầy đủ thông tin",
        });
    }
    // check username
    if (username.length < 3 && username.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Tài khoản không đúng",
        });
    }
    // check password
    if (password.length < 3 && password.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu không đúng",
        });
    }

    next();
}

module.exports = { dataRegister, dataLogin };
