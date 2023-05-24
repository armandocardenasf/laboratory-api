const oMySQLConnection = require("../database");
const { jsPDF } = require("jspdf");
const PdfFormat = require("../helpers/pdf-format");
const { response } = require("express");
const JSZip = require("jszip");
require("jspdf-autotable");

const getPdf = async (req, res) => {
  const { oResultadoId } = req.body;

  // get the parameters from db.
  const query = "CALL GetResultadoParameterValueSP(?);";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [oResultadoId]);

  if (!rows[0]) {
    res.status(500).send("Error");
    return;
  }

  const doc = PdfFormat.getDocument(rows[0]);

  // send pdf
  const buffer = doc.output();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
  res.status(200).send(buffer);
};

const getRecepcionPdf = async (req, res) => {
  const { oIdRecepcion } = req.body;

  // get the parameters from db.
  const query = "CALL GetRecepcionParameterValueSP(?);";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  if (!rows[0]) {
    res.status(500).send("Error");
    return;
  }

  const doc = PdfFormat.getDocument(rows[0]);
  const buffer = doc.output();

  // send pdf
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
  res.status(200).send(buffer);
};

module.exports = {
  getPdf,
  getRecepcionPdf,
};
