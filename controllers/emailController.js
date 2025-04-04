const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "onecapital283@gmail.com",
    pass: "xqhp wrlf pcdz kxup", // App password
  },
});

const sendEmail = async (email, subject, message, user) => {
  const mailOptions = {
   
    from: "onecapital283@gmail.com",
    to: email,
    subject: subject,
    html: `<html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; padding: 20px; background-color: #f4f4f4; }
        .content { background: white; padding: 20px; border-radius: 5px; }
        h2 { color: #d32f2f; }
        p { margin: 10px 0; }
        .footer { font-size: 12px; color: #888; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h2>Dear ${user},</h2>

          <p> <strong>${message}</strong></p>
          
          <p>If you have any questions, feel free to contact us at <strong>capitalone283@gmail.com</strong>.</p>
          <p>Best Regards,</p>
          <p><strong>Capital One Support Team</strong></p>
        </div>
        <div class="footer">
          <p>Disclaimer: This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📩 Email Sent:", subject);
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
  }
};

module.exports = sendEmail;
