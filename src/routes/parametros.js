const express = require("express");
const parametrosController = require("../controller/parametros-controller");
const { adminAuth } = require("../helpers/auth");
const router = express.Router();

//GET   /parametros
router.get("/", adminAuth, parametrosController.getParametros);

//POST  /parametros
router.post("/", adminAuth, parametrosController.insertParametro);

//PUT   /parametros
router.put("/", adminAuth, parametrosController.updateParametro);

//PUT   /parametros/delete
router.put("/delete", adminAuth, parametrosController.deleteParametro);

module.exports = router;
