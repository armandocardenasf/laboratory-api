const express = require("express");
const parametrosController = require("../controller/parametros-controller");
const router = express.Router();

//GET   /parametros
router.get("/", parametrosController.getParametros);

//GET   /parametros/byResultadoId
router.get("/byResultadoId", parametrosController.getParametrosByResultadoId);

//POST  /parametros
router.post("/", parametrosController.insertParametro);

//PUT   /parametros
router.put("/", parametrosController.updateParametro);

//PUT   /parametros/delete
router.put("/delete", parametrosController.deleteParametro);

module.exports = router;