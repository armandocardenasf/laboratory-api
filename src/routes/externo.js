const express = require("express");
const externoParametro = require("../controller/externo-controller");
const router = express.Router();

//GET   /externo
router.get("/", externoParametro.getExterno);

//POST   /externo/byid
router.post("/byid", externoParametro.getExternoById);

//POST   /externo/byUserid
router.post("/byUserid", externoParametro.getExternoByUserId);

//POST  /externo
router.post("/", externoParametro.insertExterno);

//PUT   /externo
router.put("/", externoParametro.updateExterno);

//PUT   /externo/delete
router.put("/delete", externoParametro.deleteExterno);

module.exports = router;
