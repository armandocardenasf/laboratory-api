const nodemailer = require("nodemailer");

const EMAIL = process.env.EMAIL;
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD_EMAIL,
  },
});

module.exports = transporter;
