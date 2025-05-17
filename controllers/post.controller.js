import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import { sendCommentNotificationEmail } from "../utils/sendCommentNotificationEmail.js";
export const createPost = async (req, res, next) => {
  try {
    const { content, image } = req.body;
    let newPost;
    if (image) {
      const imgResult = await cloudinary.uploader.upload(image);
      newPost = new Post({
        content,
        image: imgResult.secure_url,
        author: req.user._id,
      });
    } else {
      newPost = new Post({
        content,
        author: req.user._id,
      });
    }
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("error in createPost", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getFeedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({
      author: { $in: [...req.user.connections, req.user._id] },
    })
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getFeedPosts controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (post.image) {
      await cloudinary.uploader.destroy(
        post.image.split("/").pop().split(".")[0]
      );
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("error in deletePost", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "name username profilePicture headline")
      .populate("comments.user", "name profilePicture username headline");

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPostById controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addComment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { user: req.user._id, content } },
      },
      { new: true }
    ).populate("author", "name email username headline profilePicture");

    // create a notification if the comment owner is not the post owner
    if (post.author._id.toString() !== req.user._id.toString()) {
      const newNotification = new Notification({
        recipient: post.author,
        type: "comment",
        relatedUser: req.user._id,
        relatedPost: postId,
      });

      await newNotification.save();

      try {
        const postUrl = process.env.CLIENT_URL + "/post/" + postId;
        await sendCommentNotificationEmail(
          post.author.email,
          post.author.name,
          req.user.name,
          postUrl,
          content
        );
      } catch (error) {
        console.log("Error in sending comment notification email:", error);
      }
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in createComment controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const likepost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    const userId = req.user._id;
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes.includes(userId)) {
      // remove like
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.likes.push(userId);
      // create notification i f the user is not the author
      if (post.author.toString() !== userId.toString()) {
        const newNotification = new Notification({
          recipient: post.author,
          type: "like",
          relatedUser: userId,
          relatedPost: id,
        });
        await newNotification.save();
      }
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log("error in likepost", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
