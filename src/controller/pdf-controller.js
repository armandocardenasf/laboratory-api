const oMySQLConnection = require("../database");
const { jsPDF } = require("jspdf");
const PdfFormat = require("../helpers/pdf-format");
const { response } = require("express");
const JSZip = require("jszip");
require("jspdf-autotable");

const sendZipPdfs = async (req, res) => {
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
  const doc = PdfFormat.getDocument(groupedData);

  // send pdf
  const buffer = doc.output();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
  res.status(200).send(buffer);

  // for zip / multiple pdfs

  // const zip = new JSZip();
  // for (let i = 0; i < documents.length; i++) {
  //   const pdfData = documents[i].output("arraybuffer");
  //   zip.file(`analisis${i}.pdf`, pdfData);
  // }

  // zip
  //   .generateAsync({ type: "nodebuffer" })
  //   .then((content) => {
  //     res.set("Content-Type", "application/zip");
  //     res.set("Content-Disposition", "attachment; filename=pdfs.zip");
  //     res.send(content);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(500).send(err.message);
  //   });
};

module.exports = {
  sendZipPdfs,
};
