const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lab.cevit@cetys.mx",
    pass: "ngdsgjeqbxmaodnf",
  },
});

module.exports = transporter;
