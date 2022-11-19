import { ObjectId } from "mongodb";
import Account from "../models/Account.js";

const accountCtrl = {
    getAccount: async function (req, res, next) {
        try {
            const { userId } = req.query;

            const account = await Account.findOne({ _id: ObjectId(userId) });

            if (!account) {
                return res.json({
                    status: false,
                    message: "UserId không hợp lệ",
                });
            }

            const {
                name,
                urlAvatar,
                address,
                gender,
                story,
                username,
                phoneNumber,
            } = account;

            return res.json({
                status: true,
                message: "Lấy thông tin tài khoản thành công",
                result: {
                    _id: userId,
                    name,
                    urlAvatar,
                    address,
                    gender,
                    story,
                    username,
                    phoneNumber,
                },
            });
        } catch (error) {
            console.log(error);
        }
    },
    updateInfor: async function (req, res, next) {
        try {
            const {
                userId,
                name,
                phoneNumber,
                address,
                gender,
                story,
                urlAvatar,
            } = req.body;

            const result = await Account.findByIdAndUpdate(
                { _id: userId },
                { name, phoneNumber, address, gender, story, urlAvatar }
            );

            return res.json({
                status: true,
                message: "Cập nhật thông tin thành công!",
                result,
            });
        } catch (error) {
            console.log(error);
        }
    },
};

export default accountCtrl;
