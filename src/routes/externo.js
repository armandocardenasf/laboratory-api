const express = require("express");
const externoParametro = require("../controller/externo-controller");
const { adminAuth, authUserAndClient } = require("../helpers/auth");
const router = express.Router();

//GET   /externo
router.get("/", adminAuth, externoParametro.getExterno);

//POST   /externo/byid
router.post("/byid", adminAuth, externoParametro.getExternoById);

//POST   /externo/byUserid
router.post("/byUserid", authUserAndClient, externoParametro.getExternoByUserId);

//POST  /externo
router.post("/", adminAuth, externoParametro.insertExterno);

//PUT   /externo
router.put("/", adminAuth, externoParametro.updateExterno);

//PUT   /externo/delete
router.put("/delete", adminAuth, externoParametro.deleteExterno);

module.exports = router;
