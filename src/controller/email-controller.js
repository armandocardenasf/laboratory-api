const oMySQLConnection = require("../database");
const nodemailer = require("nodemailer");
const transporter = require("../helpers/email-transporter");
const ExcelDocument = require("../helpers/excel-format");
const ExcelJS = require("exceljs");
const fs = require("fs");

const sendBaseFormat = async (req, res) => {
  const { oIdRecepcion } = req.body;

  let query0 = "CALL GetRecepcionExternoEmailSP(?);";
  const [rows0, reponse0] = await oMySQLConnection
    .promise()
    .query(query0, [oIdRecepcion]);

  email = rows0[0][0].correo;

  if (!email) {
    res.status(500).send("The email couldn't be sent.");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("./src/assets/format.xlsx");

  const buffer = await workbook.xlsx.writeBuffer();

  // set email.
  const mailOptions = {
    from: "lab.cevit@cetys.mx",
    to: email,
    subject: `Formato de análisis CEVIT (${new Date().toJSON().slice(0, 10)})`,
    attachments: [
      {
        filename: "format.xlsx",
        content: buffer,
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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

  res.status(200).send("Email sent.");
};

// sends a xlsx file to the client.
const sendEmail = async (req, res) => {
  const { oIdRecepcion } = req.body;

  let query0 = "CALL GetRecepcionExternoEmailSP(?);";
  const [rows0, reponse0] = await oMySQLConnection
    .promise()
    .query(query0, [oIdRecepcion]);

  email = rows0[0][0].correo;

  if (!email) {
    res.status(500).send("The email couldn't be sent.");
    return;
  }

  // get the parameters from db.
  let query = "CALL GetRecepcionParameterValueSP(?);";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  if (!rows[0]) {
    res.status(500).send("Error");
    return;
  }

  // get all the data from the reception & client.
  query = "CALL GetExcelClientDataSP(?);"; //
  [rows2, fields2] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  // get the data from deviation & variance.
  query = "CALL GetAnalisisSP(?);";
  [rows3, fields3] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  // client and reception.
  const standardData = rows3[0];
  const clientData = rows2[0][0];
  const receptionData = rows[0];

  const doc = await new ExcelDocument().createFormat(
    clientData,
    receptionData,
    standardData
  );
  const buffer = await doc.getBuffer();

  // set email.
  const mailOptions = {
    from: "lab.cevit@cetys.mx",
    to: email,
    subject: `Documentación de análisis (${new Date().toJSON().slice(0, 10)})`,
    attachments: [
      {
        filename: "analisis.xlsx",
        content: buffer,
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
  const [rows4, reponse4] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  res.status(200).send("Email sent.");
};

module.exports = {
  sendBaseFormat,
  sendEmail,
};
