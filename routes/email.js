
const express = require("express");
const router = express.Router()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'onecapital283@gmail.com', // Your Email
    pass: 'onecapital7777', // Your App Password
  },
});

router.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  const mailOptions = {
    from: 'onecapital283@gmail.com',
    to: email,
    subject: subject,
    html: `<h2>Hello,</h2><p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router
