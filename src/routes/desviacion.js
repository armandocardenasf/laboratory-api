const express = require("express");
const router = express.Router();

const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");
const oMySQLConnection = require("../database");
const { adminAuth } = require("../helpers/auth");

const DesviacionEstandar = (oDato, oLista) => {
  var oMedia = oDato / oLista.length;
  var oSumaCuadradosDiferencias = 0;
  oLista.forEach(function (oNum) {
    var diferencia = oNum - oMedia;
    oSumaCuadradosDiferencias += Math.pow(diferencia, 2);
  });
  var oDesviacion = Math.sqrt(oSumaCuadradosDiferencias / oLista.length);
  return oDesviacion;
};
// defining a middleware to only accept csv files.
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "text/csv" &&
      file.mimetype !== "application/vnd.ms-excel" &&
      file.mimetype !== "application/csv"
    ) {
      return cb(new Error("Only CSV files are allowed."));
    }
    return cb(null, true);
  },
});
const getParametersId = async (header) => {
  const idColumns = Object();

  for (const column of header) {
    const query = "CALL getParameterId(?, @parameter_id)";

    let parameter_id = null;
    const [rows, fields] = await oMySQLConnection
      .promise()
      .query(query, [column]);

    parameter_id = rows[0][0].parameter_id;

    if (parameter_id) {
      idColumns[column] = parameter_id;
    }
  }
  return idColumns;
};
// POST    desviacion/insertFile
router.post(
  "/insertFile",
  adminAuth,
  upload.single("csvFile"),
  async (req, res) => {
    const { userId } = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const csvData = req.file.buffer.toString();

    let header = "";
    const results = [];
    let oSumatoria = 0;
    let oArray = [];
    let oRefAgua = "";
    let oRefEtanol = "";
    csv()
      .on("headers", (headers) => {
        header = headers;
      })
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log("Data");
      })
      .write(csvData);
    for (let i = 6; i < header.length; i++) {
      results.map((rec, cont) => {
        oSumatoria += Number(rec[header[i]].replace(/[^0-9.]/g, ""));
        oArray.push(Number(rec[header[i]].replace(/[^0-9.]/g, "")));
        oRefAgua = rec[header[4]];
        oRefEtanol = rec[header[5]];
      });
      console.log(
        "DESVIACION DE: " + header[i],
        DesviacionEstandar(oSumatoria, oArray)
      );
      try {
        const oDesviacion = DesviacionEstandar(oSumatoria, oArray);
        const oParametro = header[i];
        const query = "CALL InsertCalculosSP(?,?,?,?);";
        oMySQLConnection.query(query, [
          oParametro,
          oDesviacion.toFixed(4),
          oRefAgua,
          oRefEtanol,
        ]);
      } catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong.");
        return;
      }
      oSumatoria = 0;
      oArray = [];
    }
    res.status(200).send("Data insertion completed successfully.");
  }
);

module.exports = router;
