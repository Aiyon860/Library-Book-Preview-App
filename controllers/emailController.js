import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transferEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    logger: true,
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject,
    text: `From: ${email}\n\n${message}`,
  };

  await transporter.sendMail(mailOptions);
};

export { transferEmail };
