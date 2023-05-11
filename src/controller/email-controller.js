const oMySQLConnection = require("../database");
const nodemailer = require("nodemailer");
const transporter = require("../helpers/email-transporter");

const sendEmail = (req, res) => {
  const { oIdRecepcion } = req.body;

  //
  // TODO: validate Recepcion current state to determine if the email can be sent or not.
  //

  // get the user's email.
  let query = "CALL GetRecepcionExternoEmailSP(?);";
  oMySQLConnection.query(query, [oIdRecepcion], (err, rows) => {
    if (err) {
      res.status(500).send("An error occurred. Email not found.");
      return;
    }
  });

  const mailOptions = {
    from: "lab.cevit@cetys.mx",
    to: "oscar.encinas@cetys.edu.mx",
    subject: "Prueba de correo",
    text: "Esta es una prueba usando nodemailer.",
  };

  // send the email.
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send("An error occurred while sending the email.");
      return;
    }
  });

  // update email state to sent.
  query = "CALL UpdateSendEmailSP(?);";
  oMySQLConnection.query(query, [oIdRecepcion], (err, rows) => {
    if (err) {
      res.status(500).send("The email couldn't be sent.");
      return;
    }
  });

  res.status(200).send("Email sent.");
};

module.exports = {
  sendEmail,
};
