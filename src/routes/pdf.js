const express = require("express");
const router = express.Router();
const { adminAuth, clientAuth } = require("../helpers/auth");
const oPdfController = require("../controller/pdf-controller");

// POST pdf/resultado
router.post("/resultado", oPdfController.sendZipPdfs);

// POST pdf
router.post("/recepcion"); // TODO

module.exports = router;
