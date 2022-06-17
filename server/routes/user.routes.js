import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middlewares.js";
import { getUserItems, getUserClaims } from "../controllers/user.controller.js";

router.route("/myFoundItems").get(isLoggedIn, getUserItems);
router.route("/claims").get(isLoggedIn, getUserClaims);

export default router;
