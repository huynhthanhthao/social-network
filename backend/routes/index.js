import express from "express";
import authRouter from "./auth.js";
import postRouter from "./post.js";
import AccountRouter from "./account.js";

const router = express.Router();

/* Login register */
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/accounts", AccountRouter);

export default router;
