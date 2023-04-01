const express = require("express");
const router = express.Router();

const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");


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
    const csvData = req.file.buffer.toString();

    const results = []
    csv()
        .on("data", (data) => results.push(data))
        .on("end", () => {
            res.status(200).send("File uploaded successfully.")
        })
        .write(csvData);

    res.status(200).send("yes");
})

module.exports = router;
