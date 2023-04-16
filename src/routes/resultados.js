const express = require("express");
const resultadosController = require("../controller/resultados-controller");
const router = express.Router();

//GET   /resultados
router.get("/", resultadosController.getResultados);

//GET   /resultados/all/:clientId
router.get("/all/:clientId", resultadosController.getAllResultadosByClienteId);

//POST   /resultados/byClienteId
router.post("/byClienteId", resultadosController.getResultadoByClienteId);

//POST  /resultados
router.post("/", resultadosController.insertResultado);

//PUT   /resultados
router.put("/", resultadosController.updateResultado);

//PUT   /resultados/delete
router.put("/delete", resultadosController.deleteResultado);

module.exports = router;
