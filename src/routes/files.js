const express = require("express");
const router = express.Router();

const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");
const oMySQLConnection = require("../database");
const { adminAuth } = require("../helpers/auth");

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

    // see if any of the results is repeated.
    for (const analysis of results) {
      let query = `SELECT rec.Folio AS folio, COUNT(*) AS count FROM resultados res
        INNER JOIN Recepcion AS rec
          ON res.Recepcion_id = rec.id
        WHERE Folio = ?;`;
      const [rows, fields] = await oMySQLConnection
        .promise()
        .query(query, [analysis["FOLIO"]]);

      if (rows[0].count > 0) {
        res
          .status(400)
          .send(
            `Los datos del folio ${rows[0].folio} ya fueron subidos exitosamente.`
          );
      }
    }

    try {
      for (const analysis of results) {
        try {
          resultId = await insertResult(analysis, userId);
        } catch (e) {
          if (e.code === "ER_SIGNAL_EXCEPTION") {
            res
              .status(400)
              .send(
                `El Folio ${analysis["FOLIO"]} no posee un formato de recepción válido.`
              );
            return;
          }
          res.status(500).send("Something went wrong.");
          return;
        }

        if (!resultId) {
          continue;
        }

        for (const [parameter, idParameter] of Object.entries(idParameters)) {
          let [query, resultParameter] = ["", ""];

          // check if relevant parameters to append to the result.
          switch (parameter) {
            case "Fecha Analisis":
              query = "UPDATE resultados SET fecha_analisis = ? WHERE id = ?;";
              resultParameter = analysis[parameter];
              break;
            case "Hora Analisis":
              query = "UPDATE resultados SET fecha_informe = ? WHERE id = ?;";
              resultParameter = analysis[parameter];
              break;
            case "Fecha Informe":
              query = "UPDATE resultados SET hora_analisis = ? WHERE id = ?;";
              resultParameter = analysis[parameter];
              break;
          }

          // if: is part of the result data.
          if (query) {
            const [rows, fields] = await oMySQLConnection
              .promise()
              .query(query, [resultParameter, resultId]);
          } else {
            await insertResultParameter(
              idParameter,
              resultId,
              analysis[parameter]
            );
          }
        }

        // insert Estabilidad proteica, Estabilidad tartárica, Sulfitos libres, Sulfitos totales
        query = "CALL insertAdditionalParameters(?);";
        const [rows2, fields2] = await oMySQLConnection
          .promise()
          .query(query, [resultId]);
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("Something went wrong.");
      return;
    }

    res.status(200).send("Data insertion completed successfully.");
  }
);

const countResults = async (muestra) => {
  const query =
    "SELECT COUNT(muestra) AS `count` FROM `resultados` WHERE `muestra` = ?;";
  const [rows, fields] = await oMySQLConnection
    .promise()
    .query(query, [muestra]);
  return rows[0].count;
};

const insertResultParameter = async (oParametrosId, oResultadosId, valor) => {
  const query = "CALL insertResultParameter(?, ?, ?);";
  try {
    await oMySQLConnection
      .promise()
      .query(query, [oParametrosId, oResultadosId, valor]);
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
