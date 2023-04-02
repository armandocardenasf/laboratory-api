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
        if (file.mimetype !== 'text/csv') {
            return cb(new Error("Only CSV files are allowed."));
        }
        return cb(null, true);
    }
});

// POST     files/insertFile
router.post('/insertFile', upload.single("csvFile"), (req, res) => {
    const { userId } = req.body;

    const csvData = req.file.buffer.toString();

    let header = null;
    const results = [];
    csv()
        .on("headers", (headers) => {
            header = headers;
        })
        .on("data", (data) => results.push(data))
        .on("end", () => {
            res.status(200).send("File uploaded successfully.")
        })
        .write(csvData);
        
    const idColumns = getParametersId();

    for (const analysis of results) {
        // see if result is already in db.
        const query = 'SELECT `COUNT(muestra)` FROM `cevitdb.resultados` WHERE `muestra` = ?;';
        const count = oMySQLConnection.query(query, [analysis["FOLIO"]], (err, res) => {
            if (err) {
                res.status(400).send("An error has occurred.");
            }
        })

        let id;
        if (count > 0) {
            id = getResultId(analysis["FOLIO"], userId);
        } else {
            id = insertResult(analysis, userId);
        }

        // insert parameters.
        
    }

    res.status(200).send("yes");
})

const getParametersId = () => {
    const idColumns = Object();

    for (const column of header) {
        const query = 'CALL getParameterId(?)';

        let parameter_id = null;
        oMySQLConnection.query(query, [column], (err, res) => {
            if (err) {
                res.status(400).send("An error has occurred.");
            } else {
                parameter_id = res[0][0].parameter_id;
            }
        });

        if (parameter_id) {
            idColumns[column] = parameter_id;
        }
    }
    return idColumns;
}

const insertResult = (analysis, userId) => {
    const query = "CALL insertResult(?, ?, ?, ?, ?, ?, ?, ?, ?);";
    return oMySQLConnection.query(query, [
        analysis["FOLIO"], // muestra
        anlaysis["Modelo"] === "Vino" ? 1 : 0, // tipo_muestra
        analysis["Fecha Muestreo"], // fecha_muestra
        analysis["Fecha Recepcion"], // fecha_recepcion
        analysis["Cantidad de Muestras"], // cantidad_muestras 
        analysis["Fecha Analisis"], // fecha_analisis
        analysis["Fecha Informe"], // fecha_informe
        analysis["Hora Analisis"], // hora_analisis
        userId, // cliente_id
    ], 
    (err, res) => {
        if (err) {
            res.status(400).send("An error has occurred.");
        }
    })
}

const getResultId = (muestra, userId) => {
    const query = 'CALL getResultId(?)';
    return oMySQLConnection.query(query, [muestra, userId], (err, res) => {
        if (err) {
            res.status(400).send("An error has occurred.");
        }
    })
}

module.exports = router;
