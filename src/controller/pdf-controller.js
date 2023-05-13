const oMySQLConnection = require("../database");
const { jsPDF } = require("jspdf");
const PdfFormat = require("../helpers/pdf-format");
const { response } = require("express");
require("jspdf-autotable");

const sendPDF = async (req, res) => {
  const { oResultadoId } = req.body;

  // get the parameters from db.
  const query = "CALL GetResultadoParameterValueSP(?);";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [oResultadoId]);

  if (!rows) {
    res.status(500).send("Error");
    return;
  }

  const groupedData = PdfFormat.getGroupedData(rows[0]);
  const formattedData = PdfFormat.getFormattedData(groupedData);
  const doc = PdfFormat.generate(formattedData);

  // send pdf
  const buffer = doc.output();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
  res.status(200).send(buffer);
};

module.exports = {
  sendPDF,
};
