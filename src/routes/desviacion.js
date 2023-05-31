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
    console.log(csvData, "===");
    try {
      for (const analysis of results) {
        console.log(analysis);
        // resultId = await insertResult(analysis, userId);
        // if (!resultId) {
        //   continue;
        // }
        // check if relevant parameters to append to the result.
        // if: is part of the result data.
        //   if (query) {
        //     const [rows, fields] = await oMySQLConnection
        //       .promise()
        //       .query(query, [resultParameter, resultId]);
        //   } else {
        //     await insertResultParameter(
        //       idParameter,
        //       resultId,
        //       analysis[parameter]
        //     );
        //   }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("Something went wrong.");
      return;
    }

    res.status(200).send("Data insertion completed successfully.");
  }
);

module.exports = router;
