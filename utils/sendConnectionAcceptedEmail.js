import dotenv from "dotenv";
import { transporter } from "../nodemailer/nodemailer.config.js";
import { createConnectionAcceptedEmailTemplate } from "../nodemailer/emailTemplates.js";
dotenv.config();

export const sendConnectionAcceptedEmail = async (
  senderEmail,
  senderName,
  recipientName,
  profileUrl
) => {
  try {
    // Email content
    const mailOptions = {
      from: `"linkedin-clone" <${process.env.EMAIL_USER}>`,
      to: senderEmail,
      subject: "Connection Accepted",
      html: createConnectionAcceptedEmailTemplate(
        senderName,
        recipientName,
        profileUrl
      ),
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(" email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending  email:", error);
    throw new Error("Failed to send  email");
  }
};
