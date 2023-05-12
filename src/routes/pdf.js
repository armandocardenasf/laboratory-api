const express = require("express");
const router = express.Router();
const { adminAuth, clientAuth } = require("../helpers/auth");
const oPdfController = require("../controller/pdf-controller");

// POST pdf/resultado
router.post("/resultado", oPdfController.sendEmail);

// POST pdf/recepcion/
router.post("/recepcion"); // TODO

module.exports = router;
