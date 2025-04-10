// utils/sendEmail.js

import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: process.env.SMTP_SERVICE, // e.g., 'gmail'
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Bookink Library" <${process.env.SMTP_MAIL}>`, // Adds sender name
      to: email,
      subject,
      html: message, // HTML email body
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", email);
  } catch (error) {
    console.error(" Failed to send email:", error.message);
    throw new Error("Email delivery failed");
  }
};
