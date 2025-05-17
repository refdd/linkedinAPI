import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  addComment,
  createPost,
  deletePost,
  getFeedPosts,
  getPostById,
  likepost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.get("/:id", protectRoute, getPostById);
router.post("/:id/comment", protectRoute, addComment);
router.post("/:id/like", protectRoute, likepost);

export default router;
