const express = require("express");

const logsController = require("../controller/log-controller");

const router = express.Router();

//POST /log
router.post("/", logsController.getLogs);

//POST /log
router.post("/", logsController.insertLogs);

module.exports = router;
