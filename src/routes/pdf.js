const express = require("express");
const router = express.Router();
const { adminAuth, clientAuth } = require("../helpers/auth");
const oPdfController = require("../controller/pdf-controller");

// POST pdf/resultado
router.post("/resultado", adminAuth, oPdfController.sendPdf);

// POST pdf/recepcion
router.post("/recepcion", adminAuth, oPdfController.sendRecepcionPdf);

module.exports = router;
