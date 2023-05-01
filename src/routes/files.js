const express = require("express");
const router = express.Router();

const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");
const oMySQLConnection = require("../database");

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

// POST     files/insertFile
router.post("/insertFile", upload.single("csvFile"), async (req, res) => {
  const { userId } = req.body;

  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const csvData = req.file.buffer.toString();

  let header = null;
  const results = [];
  csv()
    .on("headers", (headers) => {
      header = headers;
    })
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log("Data successfully uploaded.");
    })
    .write(csvData);

  const idParameters = await getParametersId(header);

  try {
    for (const analysis of results) {
      // see if result is already in db.
      const count = await countResults(analysis["FOLIO"]);

      let resultId;
      if (count > 0) {
        resultId = await getResultId(analysis["FOLIO"], userId);
      } else {
        resultId = await insertResult(analysis, userId);
      }

      if (!resultId) {
        continue;
      }

      for (const [parameter, idParameter] of Object.entries(idParameters)) {
        await insertResultParameter(idParameter, resultId, analysis[parameter]);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong.");
    return;
  }

  res.status(200).send("Data insertion completed successfully.");
});

const countResults = async (muestra) => {
  const query =
    "SELECT COUNT(muestra) AS `count` FROM `resultados` WHERE `muestra` = ?;";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [muestra]);
  return rows[0].count;
};

const insertResultParameter = async (parametros_id, resultados_id, valor) => {
  const query = "CALL insertResultParameter(?, ?, ?);";
  try {
    await oMySQLConnection
      .promise()
      .query(query, [parametros_id, resultados_id, valor]);
  } catch (e) {
    res.status(500).send("Something went wrong.");
  }
};

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

const insertResult = async (analysis, userId) => {
  const query = "CALL insertResult(?, ?, ?, ?, ?, ?, @result_id);";
  const [rows, fields] = await oMySQLConnection.promise().query(query, [
    analysis["FOLIO"], // muestra
    analysis["Modelo"] === "Vino" ? 1 : 0, // tipo_muestra
    analysis["Fecha Analisis"], // fecha_analisis
    analysis["Fecha Informe"], // fecha_informe
    analysis["Hora Analisis"], // hora_analisis
    userId, // cliente_id
  ]);
  return rows[0][0].result_id;
};

const getResultId = async (muestra, userId) => {
  const query = "CALL getResultId(?, ?, @result_id)";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [muestra, userId]);
  return rows[0][0].result_id;
};

module.exports = router;
