const express = require("express");
const router = express.Router();
const { adminAuth, authUserAndClient } = require("../helpers/auth");
const oAnalisisController = require("../controller/analisis-controller");

// GET analisis/:resultadoId
router.get("/:resultadoId", adminAuth, oAnalisisController.getAnalysis);

//PUT analisis
router.put("/", adminAuth, oAnalisisController.updateAnalysis);

module.exports = router;
