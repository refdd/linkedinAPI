import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  const notification = await Notification.find({
    recipient: req.user._id,
  })
    .populate("relatedUser", "name username profilePicture")
    .populate("relatedPost", "content image")
    .sort({ createdAt: -1 })
    .limit(20);
  res.status(200).json(notification);
  try {
  } catch (error) {
    console.log("Error in getUserNotifications", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipient: userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.log("Error in markNotificationAsRead", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      recipient: userId,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotification", error.message);
    res.status(500).json({ message: error.message });
  }
};
