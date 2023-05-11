const oMySQLConnection = require("../database");
const nodemailer = require("nodemailer");
const transporter = require("../helpers/email-transporter");

const sendEmail = async (req, res) => {
  const { oIdRecepcion } = req.body;

  //
  // TODO: validate Recepcion current state to determine if the email can be sent or not.
  //

  // get the user's email.
  let email = "";

  let query = "CALL GetRecepcionExternoEmailSP(?);";
  const [rows, reponse] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  email = rows[0][0].correo;

  if (!email) {
    res.status(500).send("The email couldn't be sent.");
    return;
  }

  const mailOptions = {
    from: "lab.cevit@cetys.mx",
    to: email,
    subject: "Prueba de correo",
    text: "Esta es una prueba usando nodemailer.",
  };

  console.log(email);

  // send the email.
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send("An error occurred while sending the email.");
      return;
    }
  });

  // update email state to sent.
  query = "CALL UpdateSendEmailSP(?);";
  const [rows2, reponse2] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  res.status(200).send("Email sent.");
};

module.exports = {
  sendEmail,
};
