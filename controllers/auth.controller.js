import User from "../models/user.modle.js";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail.js";
export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "3d", // 7 days
  });
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("jwt-linkedin", token, {
    httpOnly: true,
    domain: isProduction ? "store-api-three-iota.vercel.app" : undefined,
    secure: isProduction,
    sameSite: isProduction ? "none" : "strict", // "none" allows cross-site cookies with secure flag
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
  });
  return token;
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    generateTokenAndSetCookie(res, user._id);
    res.status(200).json({ message: "Login successfully", user });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with email already exists" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: " User with username already exists" });
    }
    const user = new User({
      name,
      username,
      email,
      password,
    });
    await user.save();
    // Generate JWT token
    generateTokenAndSetCookie(res, user._id);
    res.status(201).json({ message: "User created successfully", user });
    // todo : send wellcome email
    sendWelcomeEmail(email, name);
  } catch (error) {
    // next(error)
    console.log("Error in signup", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt-linkedin");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    // next(error)
    console.log();
  }
};

export const getUserDetails = async (req, res, next) => {
  const user = req.user;
  try {
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserDetails", error.message);
    res.status(500).json({ message: error.message });
  }
};
