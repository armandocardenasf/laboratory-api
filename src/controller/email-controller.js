const oMySQLConnection = require("../database");
const nodemailer = require("nodemailer");
const transporter = require("../helpers/email-transporter");
const PdfFormat = require("../helpers/pdf-format");

const sendEmail = async (req, res) => {
  const { oIdRecepcion } = req.body;

  let query = "CALL GetRecepcionExternoEmailSP(?);";
  const [rows2, reponse2] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  email = rows2[0][0].correo;

  if (!email) {
    res.status(500).send("The email couldn't be sent.");
    return;
  }

  // get data from email.
  query = "CALL GetRecepcionParameterValueSP(?);";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  const doc = new PdfFormat().getDocument(rows[0]);
  const buffer = doc.output();

  // set email.
  const mailOptions = {
    from: "lab.cevit@cetys.mx",
    to: email,
    subject: `Documentación de análisis (${new Date().toJSON().slice(0, 10)})`,
    attachments: [
      {
        filename: "analisis.pdf",
        content: buffer,
        contentType: "application/pdf",
      },
    ],
  };

  // send the email.
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send("An error occurred while sending the email.");
      return;
    }
  });

  // update email state to sent.
  query = "CALL UpdateSendEmailSP(?);";
  const [rows3, reponse3] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  res.status(200).send("Email sent.");
};

module.exports = {
  sendEmail,
};
