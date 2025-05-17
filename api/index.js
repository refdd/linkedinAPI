// Update your server.js or app.js file with these changes

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "../routers/auth.route.js";
import userRoutes from "../routers/user.route.js";
import postRoutes from "../routers/post.route.js";
import notificationRoutes from "../routers/notification.route.js";
import connectionsRoutes from "../routers/connections.route.js";
import { connectDB } from "../lib/db.js";

dotenv.config();
const app = express();
// Database Connection
connectDB();
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://yourdomain.com"
      : ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Configure Express middleware - ORDER MATTERS
// Set CORS first
app.use(cors(corsOptions));

// Set JSON body parser with increased limits BEFORE routes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/connections", connectionsRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
