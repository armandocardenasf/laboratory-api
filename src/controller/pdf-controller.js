const oMySQLConnection = require("../database");
const { jsPDF } = require("jspdf");
const PdfFormat = require("../helpers/pdf-format");
require("jspdf-autotable");

const sendEmail = (req, res) => {
  let data = [
    {
      no: 1,
      id: 1,
      m15: "",
      v15: "",
      emb: "",
      mant: "",
      mc: "",
      ep: "",
      et: "",
      bt: "",
      s02: "",
    },
  ];

  // get the data
  const doc = new PdfFormat().generate(data);

  // send pdf
  const buffer = doc.output();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
  res.status(200).send(buffer);
};

module.exports = {
  sendEmail,
};
