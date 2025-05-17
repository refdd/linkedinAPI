export const VERIFICATION_EMAIL_TEMPLATE = (name, token, verificationUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - LinkedIn</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #000000; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://static.licdn.com/sc/h/akt4ae504epesldzj74dzred8" alt="LinkedIn" style="width: 84px; height: 21px;">
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Please verify your email address to complete your LinkedIn registration.</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #0a66c2;">${token}</span>
    </div>
    <p style="font-size: 16px; margin-bottom: 20px;">Or click the button below to verify your email:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" style="background-color: #0a66c2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: 600; font-size: 16px;">
        Verify Email
      </a>
    </div>
    <p style="font-size: 14px; color: #666666;">This verification code will expire in 15 minutes.</p>
    <p style="font-size: 14px; color: #666666;">If you didn't create a LinkedIn account, please ignore this email.</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #666666; font-size: 12px;">
    <p>This is an automated message from LinkedIn. Please do not reply.</p>
    <p>© 2024 LinkedIn Corporation, 1000 W Maude Ave, Sunnyvale, CA 94085</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = (email, name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful - LinkedIn</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #000000; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://static.licdn.com/sc/h/akt4ae504epesldzj74dzred8" alt="LinkedIn" style="width: 84px; height: 21px;">
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Your LinkedIn password has been successfully reset for the account associated with ${email}.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #0a66c2; color: white; width: 40px; height: 40px; line-height: 40px; border-radius: 50%; display: inline-block; font-size: 20px;">
        ✓
      </div>
    </div>
    <p style="font-size: 16px; margin-bottom: 20px;">If you didn't request this change, please secure your account immediately by:</p>
    <ul style="font-size: 16px; margin-bottom: 20px;">
      <li>Resetting your password</li>
      <li>Reviewing your account activity</li>
      <li>Enabling two-step verification</li>
    </ul>
    <p style="font-size: 16px;">Thank you for helping us keep your account secure.</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #666666; font-size: 12px;">
    <p>This is an automated message from LinkedIn. Please do not reply.</p>
    <p>© 2024 LinkedIn Corporation, 1000 W Maude Ave, Sunnyvale, CA 94085</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = (email, name, websiteUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - LinkedIn</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #000000; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://static.licdn.com/sc/h/akt4ae504epesldzj74dzred8" alt="LinkedIn" style="width: 84px; height: 21px;">
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
    <p style="font-size: 16px; margin-bottom: 20px;">We received a request to reset the password for your LinkedIn account (${email}).</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Click the button below to reset your password:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${websiteUrl}" style="background-color: #0a66c2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: 600; font-size: 16px;">Reset Password</a>
    </div>
    <p style="font-size: 14px; color: #666666;">This link will expire in 1 hour for security reasons.</p>
    <p style="font-size: 14px; color: #666666;">If you didn't request this password reset, you can safely ignore this email.</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #666666; font-size: 12px;">
    <p>This is an automated message from LinkedIn. Please do not reply.</p>
    <p>© 2024 LinkedIn Corporation, 1000 W Maude Ave, Sunnyvale, CA 94085</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = (name, email, profileUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to LinkedIn</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #000000; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://static.licdn.com/sc/h/akt4ae504epesldzj74dzred8" alt="LinkedIn" style="width: 84px; height: 21px;">
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Welcome to LinkedIn! We're excited to have you join our professional community.</p>
    <p style="font-size: 16px; margin-bottom: 20px;">Your registered email: ${email}</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${profileUrl}" style="background-color: #0a66c2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: 600; font-size: 16px;">
        View Your Profile
      </a>
    </div>
    
    <div style="margin: 30px 0;">
      <h3 style="color: #0a66c2; border-bottom: 1px solid #e6e6e6; padding-bottom: 10px; font-size: 18px;">Next steps to grow your network</h3>
      
      <div style="display: flex; margin-bottom: 20px;">
        <div style="background-color: #f3f6f8; border-radius: 2px; padding: 15px; margin: 10px; flex: 1;">
          <h4 style="color: #0a66c2; margin-top: 0; font-size: 16px;">Complete your profile</h4>
          <p style="font-size: 14px;">Add your work experience, education, and skills to help others find you.</p>
        </div>
        
        <div style="background-color: #f3f6f8; border-radius: 2px; padding: 15px; margin: 10px; flex: 1;">
          <h4 style="color: #0a66c2; margin-top: 0; font-size: 16px;">Connect with others</h4>
          <p style="font-size: 14px;">Build your network by connecting with people you know.</p>
        </div>
      </div>
      
      <div style="background-color: #f3f6f8; border-radius: 2px; padding: 15px; margin: 10px;">
        <h4 style="color: #0a66c2; margin-top: 0; font-size: 16px;">Need help?</h4>
        <p style="font-size: 14px;">Visit our Help Center for tips on getting the most out of LinkedIn.</p>
      </div>
    </div>
    
    <p style="font-size: 16px;">We're here to help you build your professional network and advance your career.</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #666666; font-size: 12px;">
    <p>This is an automated message from LinkedIn. Please do not reply.</p>
    <p>© 2024 LinkedIn Corporation, 1000 W Maude Ave, Sunnyvale, CA 94085</p>
  </div>
</body>
</html>
`;
export const createConnectionAcceptedEmailTemplate = (
  senderName,
  recipientName,
  profileUrl
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connection Request Accepted</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://img.freepik.com/premium-vector/linkedin-logo_578229-227.jpg" alt="UnLinked Logo" style="width: 150px; margin-bottom: 20px;border-radius: 10px;"/>
    <h1 style="color: white; margin: 0; font-size: 28px;">Connection Accepted!</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: #0077B5;"><strong>Hello ${senderName},</strong></p>
    <p>Great news! <strong>${recipientName}</strong> has accepted your connection request on UnLinked.</p>
    <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="font-size: 16px; margin: 0;"><strong>What's next?</strong></p>
      <ul style="padding-left: 20px;">
        <li>Check out ${recipientName}'s full profile</li>
        <li>Send a message to start a conversation</li>
        <li>Explore mutual connections and interests</li>
      </ul>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${profileUrl}" style="background-color: #0077B5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">View ${recipientName}'s Profile</a>
    </div>
    <p>Expanding your professional network opens up new opportunities. Keep connecting!</p>
    <p>Best regards,<br>The UnLinked Team</p>
  </div>
</body>
</html>
`;

export const createCommentNotificationEmailTemplate = (
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Comment on Your Post</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #0077B5, #00A0DC); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://img.freepik.com/premium-vector/linkedin-logo_578229-227.jpg" alt="UnLinked Logo" style="width: 150px; margin-bottom: 20px;border-radius: 10px;"/>
    <h1 style="color: white; margin: 0; font-size: 28px;">New Comment on Your Post</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: #0077B5;"><strong>Hello ${recipientName},</strong></p>
    <p>${commenterName} has commented on your post:</p>
    <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="font-style: italic; margin: 0;">"${commentContent}"</p>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href=${postUrl} style="background-color: #0077B5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">View Comment</a>
    </div>
    <p>Stay engaged with your network by responding to comments and fostering discussions.</p>
    <p>Best regards,<br>The UnLinked Team</p>
  </div>
</body>
</html>
`;
