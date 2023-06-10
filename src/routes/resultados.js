const express = require("express");
const resultadosController = require("../controller/resultados-controller");
const { adminAuth } = require("../helpers/auth");
const router = express.Router();

//POST   /resultados
router.post("/", adminAuth, resultadosController.getResultados);

//GET   /resultados/all/:clientId
router.get(
  "/all/:clientId",
  adminAuth,
  resultadosController.getAllResultadosByClienteId
);

//POST   /resultados/byClienteId
router.post(
  "/byClienteId",
  adminAuth,
  resultadosController.getResultadoByClienteId
);

//POST  /resultados
router.post("/", adminAuth, resultadosController.insertResultado);

//PUT   /resultados
router.put("/", adminAuth, resultadosController.updateResultado);

//PUT   /resultados/delete
router.put("/delete", adminAuth, resultadosController.deleteResultado);

module.exports = router;
