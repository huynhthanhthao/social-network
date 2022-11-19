import argon2 from "argon2";
import * as dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";
import Account from "../models/Account.js";

const AuthCtrl = {
    login: async function (req, res, next) {
        // handle login
        try {
            const { username, password } = req.body;
            const account = await Account.findOne({ username });

            // Check valid password
            if (!account) {
                return res.json({
                    status: false,
                    message: "Tài khoản hoặc mật khẩu không đúng",
                });
            }

            const { _id } = account;
            const passwordValid = await argon2.verify(
                account.password,
                password
            );

            if (!passwordValid)
                return res.json({
                    status: false,
                    message: "Tài khoản hoặc mật khẩu không đúng",
                });

            // All good
            // Create token
            const accessToken = jwt.sign(
                { _id: account._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res.json({
                status: true,
                message: "Đăng nhập thành công",
                accessToken,
                userId: _id,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ success: false, message: "Server Error!" });
        }
    },
    register: async function (req, res, next) {
        try {
            const { name, username, password } = req.body;
            const account = await Account.findOne({ username });

            // Check missing data
            if (!name || !username || !password) {
                return res.json({
                    status: false,
                    message: "Vui lòng điền thông tin đầy đủ",
                });
            }

            // Check account exist
            if (account) {
                return res.json({
                    status: false,
                    message: "Tên người dùng đã tồn tại",
                });
            }

            // All good
            const hashedPassword = await argon2.hash(password);
            const newAccount = await Account.create({
                username,
                password: hashedPassword,
                name,
            });

            return res.json({
                status: true,
                message: "Đăng ký tài khoảng thành công",
                newAccount,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ success: false, message: "Server Error!" });
        }
    },
};

export default AuthCtrl;
