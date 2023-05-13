const express = require("express");
const router = express.Router();
const { adminAuth, clientAuth } = require("../helpers/auth");
const oPdfController = require("../controller/pdf-controller");

// POST pdf/resultado
router.post("/resultado", clientAuth, oPdfController.sendPdf);

// POST pdf/recepcion
router.post("/recepcion", clientAuth, oPdfController.sendRecepcionPdf);

module.exports = router;
