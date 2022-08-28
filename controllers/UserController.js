const User = require("../models/user");

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class UserController {

    //[POST] /auth/register
    async register(req, res) {
        const { name, username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if(user) {
                return res.status(400).json({
                    success: false,
                    msg: 'Tài khoản đã được sử dụng',
                })
            }

            // Hash password argon2 
            const hashPassword = await argon2.hash(password);
            const newUser = new User({
                name: name,
                username: username,
                password: hashPassword,
            })
            await newUser.save();

            // tokens jsonwebtoken
            const accessToken = await jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET); 

            res.json({
                success: true,
                msg: "Tạo tài khoản thành công",
                accessToken
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: 'Server error',
            })
        }
    }

    //[POST] /auth/login
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if(!user) {
                return res.status(400).json({
                    success: false,
                    msg: 'Tài khoản hoặc mật khẩu không đúng',
                })
            }

            // verify password argon2 
            const passwordValid = await argon2.verify(user.password, password);
            if(!password) {
                return res.status(400).json({
                    success: false,
                    msg: 'Tài khoản hoặc mật khẩu không đúng',
                })
            }
            // switch password token
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            res.json({
                success: true,
                msg: "Đăng nhập thành công",
                accessToken
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                msg: 'Server error',
            })
        }
    }

    async update(req, res) {
    }

}

module.exports = new UserController();