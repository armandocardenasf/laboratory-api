const oMySQLConnection = require("../database");
const { jsPDF } = require("jspdf");
const PdfFormat = require("../helpers/pdf-format");
const { response } = require("express");
const JSZip = require("jszip");
const ExcelDocument = require("../helpers/excel");
require("jspdf-autotable");

// const getPdf = async (req, res) => {
//   const { oResultadoId } = req.body;

//   // get the parameters from db.
//   const query = "CALL GetResultadoParameterValueSP(?);";
//   const [rows, fields] = await oMySQLConnection
//     .promise()
//     .query(query, [oResultadoId]);

//   if (!rows[0]) {
//     res.status(500).send("Error");
//     return;
//   }

//   const doc = PdfFormat.getDocument(rows[0]);

//   // send pdf
//   const buffer = doc.output();
//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
//   res.status(200).send(buffer);
// };

// const getRecepcionPdf = async (req, res) => {
//   const { oIdRecepcion } = req.body;

//   // get the parameters from db.
//   let query = "CALL GetRecepcionParameterValueSP(?);";
//   const [rows, fields] = await oMySQLConnection
//     .promise()
//     .query(query, [oIdRecepcion]);

//   if (!rows[0]) {
//     res.status(500).send("Error");
//     return;
//   }

//   // get all the data from the reception & client.
//   query = "CALL GetPdfDataSP(?)"; //
//   [rows2, fields2] = await oMySQLConnection
//     .promise()
//     .query(query, [oIdRecepcion]);

//   // client and reception.
//   const clientData = rows2[0][0];
//   const receptionData = rows[0];

//   const doc = new PdfFormat()
//     .setClientData(clientData)
//     .getDocument(receptionData);
//   const buffer = doc.output();

//   // send pdf
//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
//   res.status(200).send(buffer);
// };

const getExcelFormat = async (req, res) => {
  const { oIdRecepcion } = req.body;

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
  query = "CALL GetPdfDataSP(?)"; //
  [rows2, fields2] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  // client and reception.
  const clientData = rows2[0][0];
  const receptionData = rows[0];

  const doc = await new ExcelDocument().createFormat();
  const buffer = await doc.getBuffer();

  // send excel
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", 'attachment; filename="example.xlsx"');
  res.status(200).send(buffer);
};

module.exports = {
  // getPdf,
  // getRecepcionPdf,
  getExcelFormat,
};
