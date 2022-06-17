import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middlewares.js";

import {
  postFoundItem,
  getAllFoundItems,
  getOneFoundItem,
  claimFoundItem,
  getClaimsOnItem,
  acceptClaim,
  rejectClaim,
} from "../controllers/foundItem.controller.js";

router
  .route("/")
  .post(isLoggedIn, postFoundItem)
  .get(isLoggedIn, getAllFoundItems);

router.route("/:id").get(isLoggedIn, getOneFoundItem);

router
  .route("/claim/:itemId")
  .post(isLoggedIn, claimFoundItem)
  .get(isLoggedIn, getClaimsOnItem);

router.route("/acceptClaim/:claimId").get(isLoggedIn, acceptClaim);
router.route("/rejectClaim/:claimId").get(isLoggedIn, rejectClaim); 



export default router;
