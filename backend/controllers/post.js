import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ObjectId } from "mongodb";
import Account from "../models/Account.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

dotenv.config();

const PostCtrl = {
    createPost: async function (req, res, next) {
        try {
            const { content, url } = req.body;
            const authHeader = req.header("Authorization");
            const token = authHeader && authHeader.split(" ")[1];

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const account = await Account.findOne({ _id: decoded });

            const post = await Post.create({
                accountId: ObjectId(decoded._id),
                url,
                content,
            });
            const { _id, likes, comments } = post;

            const { name, urlAvatar } = account;

            return res.json({
                status: true,
                message: "Tạo bài viết thành công",
                result: { url, content, name, urlAvatar, _id, likes, comments },
            });
        } catch (error) {
            console.log(error);
        }
    },
    deletePost: async function (req, res, next) {
        try {
            const { postId } = req.body;
            const result = await Post.deleteOne({ _id: postId });
            return res.json({
                status: true,
                message: "Xóa bài viết thành công",
                result,
            });
        } catch (error) {
            console.log(error);
        }
    },
    lovePost: async function (req, res, next) {
        try {
            const result = await Post.findByIdAndUpdate(
                { _id: ObjectId(req.query._id) },
                { $push: { likes: req.query.userId } }
            );
            return res.status(200).json({ message: "Đã thích!", result });
        } catch (error) {
            console.log(error);
        }
    },
    async unLovePost(req, res) {
        try {
            const result = await Post.findByIdAndUpdate(
                { _id: ObjectId(req.query._id) },
                { $pull: { likes: req.query.userId } }
            );

            return res.status(200).json({ message: "Đã bỏ thích!", result });
        } catch (error) {
            return res.status(500).json({ message: error.message, error });
        }
    },
    async getPosts(req, res) {
        try {
            const posts = await Post.find({});
            const result = [];

            for (let i = 0; i < posts.length; i++) {
                const { name, urlAvatar } = await Account.findOne({
                    _id: posts[i].accountId,
                });

                const { _id, content, likes, url, createdAt, accountId } =
                    posts[i];

                const commentList = await Comment.find({
                    postId: _id,
                });

                const comments = [];

                for (let i = 0; i < commentList.length; i++) {
                    const { name, urlAvatar } = await Account.findOne({
                        _id: commentList[i].accountId,
                    });

                    comments.push({
                        name,
                        urlAvatar,
                        content: commentList[i].content,
                    });
                }

                result.push({
                    _id,
                    name,
                    urlAvatar,
                    content,
                    likes,
                    comments,
                    url,
                    createdAt,
                    accountId,
                });
            }

            return res.json({
                status: true,
                message: "Lấy danh sách bài viết thành công.",
                result,
            });
        } catch (error) {
            console.log(error);
        }
    },
    async getPostsById(req, res) {
        try {
            const { userId } = req.query;
            const posts = await Post.find({ accountId: userId });
            const result = [];

            for (let i = 0; i < posts.length; i++) {
                const { name, urlAvatar } = await Account.findOne({
                    _id: posts[i].accountId,
                });

                const { _id, content, likes, url, createdAt, accountId } =
                    posts[i];

                const commentList = await Comment.find({
                    postId: _id,
                });

                const comments = [];

                for (let i = 0; i < commentList.length; i++) {
                    const { name, urlAvatar } = await Account.findOne({
                        _id: commentList[i].accountId,
                    });

                    comments.push({
                        name,
                        urlAvatar,
                        content: commentList[i].content,
                    });
                }

                result.push({
                    _id,
                    name,
                    urlAvatar,
                    content,
                    likes,
                    comments,
                    url,
                    createdAt,
                    accountId,
                });
            }

            return res.json({
                status: true,
                message: "Lấy danh sách bài viết tử UserId thành công.",
                result,
            });
        } catch (error) {
            console.log(error);
        }
    },
    async comment(req, res) {
        try {
            const { accountId, content, postId } = req.body;

            const comment = await Comment.create({
                accountId,
                content,
                postId,
            });

            const result = await Post.findOneAndUpdate(
                { _id: postId },
                { $push: { comments: comment } }
            );
            return res
                .status(200)
                .json({ message: "Bình luận thành công!", result });
        } catch (error) {
            return res.status(500).json({ message: error.message, error });
        }
    },
    async getComment(req, res) {
        try {
            const { postId } = req.body;

            const comments = await Comment.find({
                postId,
            });

            return res
                .status(200)
                .json({ message: "Bình luận thành công!", result });
        } catch (error) {
            return res.status(500).json({ message: error.message, error });
        }
    },
};

export default PostCtrl;
