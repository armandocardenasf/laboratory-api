const ExcelDocument = require("../helpers/excel-format");
const oMySQLConnection = require("../database");

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

  // const pdf = doc.convertExcelToPDF();

  // send excel
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", 'attachment; filename="download.xlsx"');
  res.status(200).send(buffer);

  // res.setHeader("Content-Type", "application/pdf");
  // res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');
  // res.status(200).send(doc);
};

module.exports = {
  getExcelFormat,
};
