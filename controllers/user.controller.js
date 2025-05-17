import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.modle.js";

export const getSuggestiedConnections = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");
    const suggestedUsers = await User.find({
      _id: {
        $ne: req.user._id,
        $nin: currentUser.connections,
      },
      skills: {
        $in: currentUser.skills,
      },
    })
      .select("name username profilePicture headline ")
      .limit(3);
    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log("Error in getSuggestiedConnections", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserByUsername", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      "name",
      "username",
      "headline",
      "about",
      "location",
      "profilePicture",
      "bannerImg",
      "skills",
      "experience",
      "education",
    ];
    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    }

    if (req.body.profilePicture) {
      const result = await cloudinary.uploader.upload(req.body.profilePicture);
      updateData.profilePicture = result.secure_url;
    }

    if (req.body.bannerImg) {
      const result = await cloudinary.uploader.upload(req.body.bannerImg);
      updateData.bannerImg = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    }).select("-password");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateUserProfile", error.message);
    res.status(500).json({ message: error.message });
  }
};
