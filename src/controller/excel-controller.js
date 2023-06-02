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
  query = "CALL GetPdfDataSP(?)"; //
  [rows2, fields2] = await oMySQLConnection
    .promise()
    .query(query, [oIdRecepcion]);

  // client and reception.
  const clientData = rows2[0][0];
  const receptionData = rows[0];

  const doc = await new ExcelDocument().createFormat(clientData, receptionData);
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
  getExcelFormat,
};
