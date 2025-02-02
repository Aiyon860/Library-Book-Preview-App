import { transferEmail } from "../controllers/emailController.js";

const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;
  
  try {
    await transferEmail({ email, subject, message });
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
};

export { sendEmail };