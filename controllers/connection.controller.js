import ConnectionRequest from "../models/connectionRequest.modle.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.modle.js";
import { sendConnectionAcceptedEmail } from "../utils/sendConnectionAcceptedEmail.js";

export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const senderId = req.user._id;

    if (senderId.toString() === userId) {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself" });
    }

    if (req.user.connections.includes(userId)) {
      return res.status(400).json({ message: "You are already connected" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      sender: senderId,
      recipient: userId,
      status: "pending",
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A connection request already exists" });
    }

    const newRequest = new ConnectionRequest({
      sender: senderId,
      recipient: userId,
    });

    await newRequest.save();

    res.status(201).json({ message: "Connection request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await ConnectionRequest.findById(requestId)
      .populate("sender", "name email username")
      .populate("recipient", "name username");

    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    // check if the req is for the current user
    if (request.recipient._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to accept this request" });
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }

    request.status = "accepted";
    await request.save();

    // if im your friend then ur also my friend ;)
    await User.findByIdAndUpdate(request.sender._id, {
      $addToSet: { connections: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $addToSet: { connections: request.sender._id },
    });

    const notification = new Notification({
      recipient: request.sender._id,
      type: "connectionAccepted",
      relatedUser: userId,
    });

    await notification.save();

    res.json({ message: "Connection accepted successfully" });

    const senderEmail = request.sender.email;
    const senderName = request.sender.name;
    const recipientName = request.recipient.name;
    const profileUrl =
      process.env.CLIENT_URL + "/profile/" + request.recipient.username;

    try {
      await sendConnectionAcceptedEmail(
        senderEmail,
        senderName,
        recipientName,
        profileUrl
      );
    } catch (error) {
      console.error("Error in sendConnectionAcceptedEmail:", error);
    }
  } catch (error) {
    console.error("Error in acceptConnectionRequest controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const rejectConnectionRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await ConnectionRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    // check if the req is for the current user
    if (request.recipient._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to reject this request" });
    }
    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ message: "Connection request rejected successfully" });
  } catch (error) {
    console.log("Error in rejectConnectionRequest", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getConnectionRequests = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const requests = await ConnectionRequest.find({
      recipient: userId,
      status: "pending",
    })
      .populate(
        "sender",
        "name email username profilePicture headline connections"
      )
      .populate("recipient", "name email username profilePicture");

    res.status(200).json(requests);
  } catch (error) {
    console.log("Error in getConnectionRequests", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getUserConnections = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "connections",
      "name email username profilePicture headline connections"
    );
    res.status(200).json(user.connections);
  } catch (error) {
    console.log("Error in getUserConnections", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const removeConnection = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    if (userId.toString() === currentUserId.toString()) {
      return res
        .status(400)
        .json({ message: "You can't remove yourself from connections" });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { connections: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { connections: currentUserId },
    });

    res.status(200).json({ message: "Connection removed successfully" });
  } catch (error) {
    console.log("Error in removeConnection", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getConnectionStatus = async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    const currentUserId = req.user._id;

    const currentUser = req.user;
    console.log(currentUser);

    if (currentUser.connections.includes(targetUserId)) {
      return res.json({ status: "connected" });
    }

    const pendingRequest = await ConnectionRequest.findOne({
      $or: [
        { sender: currentUserId, recipient: targetUserId },
        { sender: targetUserId, recipient: currentUserId },
      ],
      status: "pending",
    });

    if (pendingRequest) {
      if (pendingRequest.sender.toString() === currentUserId.toString()) {
        return res.json({ status: "pending" });
      } else {
        return res.json({ status: "received", requestId: pendingRequest._id });
      }
    }

    // if no connection or pending req found
    res.json({ status: "not_connected" });
  } catch (error) {
    console.error("Error in getConnectionStatus controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
