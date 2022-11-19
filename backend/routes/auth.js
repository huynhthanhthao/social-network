import AuthCtrl from "../controllers/auth.js";
import express from "express";
const router = express.Router();

router.post("/login", AuthCtrl.login);
router.post("/register", AuthCtrl.register);

export default router;
