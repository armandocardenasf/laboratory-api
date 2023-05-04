const express = require("express");
const logsController = require("../controller/log-controller");
const { adminAuth } = require("../helpers/auth");
const router = express.Router();

//POST /log
router.post("/", adminAuth, logsController.getLogs);

//POST /log
router.post("/insert", adminAuth, logsController.insertLogs);

module.exports = router;
