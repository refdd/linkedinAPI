import dotenv from "dotenv";
import { transporter } from "../nodemailer/nodemailer.config.js";
import { WELCOME_EMAIL_TEMPLATE } from "../nodemailer/emailTemplates.js";
dotenv.config();
export const sendWelcomeEmail = async (email, name) => {
  try {
    const websiteUrl = process.env.FRONTEND_URL;
    const profileUrl = `${websiteUrl}/profile/${name}`;
    // Email content
    const mailOptions = {
      from: `" refat app name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Refat App!",
      html: WELCOME_EMAIL_TEMPLATE(name, email, profileUrl),
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
