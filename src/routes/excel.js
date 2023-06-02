const express = require("express");
const router = express.Router();
const { adminAuth, authUserAndClient } = require("../helpers/auth");
const oExcelController = require("../controller/excel-controller");

// POST excel/get
router.post("/get", authUserAndClient, oExcelController.getExcelFormat);

module.exports = router;
