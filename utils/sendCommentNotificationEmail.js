import dotenv from "dotenv";
import { transporter } from "../nodemailer/nodemailer.config.js";
import { createCommentNotificationEmailTemplate } from "../nodemailer/emailTemplates.js";
dotenv.config();
export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  senderName,
  postUrl,
  commentContent
) => {
  try {
    // Email content
    const mailOptions = {
      from: `" refat app name" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: "Welcome to Refat App!",
      html: createCommentNotificationEmailTemplate(
        recipientName,
        senderName,
        postUrl,
        commentContent
      ),
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
