import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getSuggestiedConnections,
  getUserByUsername,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestiedConnections);
router.get("/:username", protectRoute, getUserByUsername);
router.put("/profile", protectRoute, updateUserProfile);

export default router;
