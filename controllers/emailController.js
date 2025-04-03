const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "onecapital283@gmail.com",
    pass: "xqhp wrlf pcdz kxup", // App password
  },
});

const sendEmail = async (email, subject, message) => {
  const mailOptions = {
    from: "onecapital283@gmail.com",
    to: email,
    subject: subject,
    html: `<h2>Hello,</h2><p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📩 Email Sent:", subject);
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
  }
};

module.exports = sendEmail;
