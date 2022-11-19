import PostCtrl from "../controllers/post.js";
import express from "express";

const router = express.Router();

router.post("/create", PostCtrl.createPost);

router.get("/get-posts", PostCtrl.getPosts);

router.get("/get-posts-user", PostCtrl.getPostsById);

router.post("/delete", PostCtrl.deletePost);

router.get("/love", PostCtrl.lovePost);

router.get("/un-love", PostCtrl.unLovePost);

router.post("/comment", PostCtrl.comment);

router.post("/get-comment", PostCtrl.getComment);

export default router;
