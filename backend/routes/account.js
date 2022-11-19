import AccountCtrl from "../controllers/account.js";
import express from "express";
const router = express.Router();

router.get("/get-account", AccountCtrl.getAccount);

router.get("/search-account", AccountCtrl.searchAccount);

router.patch("/update-infor", AccountCtrl.updateInfor);

export default router;
