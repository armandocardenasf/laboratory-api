const express = require("express");
const router = express.Router();
const { adminAuth, authUserAndClient } = require("../helpers/auth");
const oPdfController = require("../controller/pdf-controller");

// POST pdf/resultado
// router.post("/resultado", authUserAndClient, oPdfController.getPdf);

// POST pdf/recepcion
router.post("/recepcion", authUserAndClient, oPdfController.getRecepcionPdf);

module.exports = router;
