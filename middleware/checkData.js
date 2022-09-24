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
    if (name.length < 4) {
        return res.status(400).json({
            success: false,
            msg: "Tên quá ngắn",
            type: "name",
        });
    }
    if (name.length > 40) {
        return res.status(400).json({
            success: false,
            msg: "Tên quá dài",
            type: "name",
        });
    }
    // check username
    if (username.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Tài khoản quá ngắn",
            type: "username",
        });
    }
    if (username.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Tài khoản quá dài",
            type: "username",
        });
    }
    if (username === "admin") {
        return res.status(400).json({
            success: false,
            msg: "Bạn không có quyền hạng đặt tài khoản admin",
            type: "username",
        });
    }
    // check password
    if (password.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu quá ngắn",
            type: "password",
        });
    }
    if (password.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu quá dài",
            type: "password",
        });
    }
    if (password !== rePassword) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu không giống nhau",
            type: "password",
        });
    }

    next();
};
const dataLogin = (req, res, next) => {
    const { username, password } = req.body;
    // check data
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            msg: "Bạn chưa điền đầy đủ thông tin",
            warning: {
                username,
                password
            }
        });
    }
    // check username
    if (username.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Điền thông tin không đúng",
            warning: {
                username
            }
        });
    }
    if (username.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Tài khoản quá ngắn",
            warning: {
                username
            }
        });
    }
    // check password
    if (password.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Điền thông tin không đúng",
            warning: {
                password
            }
        });
    }
    if (password.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu quá ngắn",
            warning: {
                password
            }
        });
    }

    next();
};

const dataUpdate = (req, res, next) => {
    const { name, username, oldPassword, newPassword } = req.body;

    // check data
    if (!name || !username || !oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            msg: "Bạn chưa điền đầy đủ thông tin",
        });
    }
    // check name
    if (name.length < 8) {
        return res.status(400).json({
            success: false,
            msg: "Tên quá ngắn",
        });
    }
    // check name
    if (name.length > 30) {
        return res.status(400).json({
            success: false,
            msg: "Tên quá dài",
        });
    }
    // check username
    if (username.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Tài khoản quá ngắn",
        });
    }
    if (username.length > 30) {
        return res.status(400).json({
            success: false,
            msg: "Tài khoản quá dài",
        });
    }
    // check password
    if (newPassword.length < 3) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu mới quá ngắn",
        });
    }
    if (newPassword.length > 20) {
        return res.status(400).json({
            success: false,
            msg: "Mật khẩu mới quá dài",
        });
    }

    next();
};

module.exports = { dataRegister, dataLogin, dataUpdate };
