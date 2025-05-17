import express from "express";

const router = express.Router();

import { protectRoute } from "../middleware/protectRoute.js";
import {
  deleteNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";

router.get("/", protectRoute, getUserNotifications);

router.put("/:notificationId/read", protectRoute, markNotificationAsRead);
router.delete("/:notificationId", protectRoute, deleteNotification);
export default router;
