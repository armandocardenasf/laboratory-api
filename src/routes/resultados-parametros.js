const express = require("express");
const resultadosParametrosController = require("../controller/resultados-parametros-controller");
const { adminAuth } = require("../helpers/auth");
const router = express.Router();

//GET   /resultados-parametros/all/:resultId
router.get(
  "/all/:resultId",
  adminAuth,
  resultadosParametrosController.getResultadosParametrosByResultadoId
);

//GET   /resultados-parametros/:parameterId
router.get(
  "/:parameterId",
  adminAuth,
  resultadosParametrosController.getResultadosParametrosByParameterId
);

//POST /resultados-parametros
router.post(
  "/",
  adminAuth,
  resultadosParametrosController.createResultadoParametro
);

//POST  /resultados-parametros/date
router.post(
  "/date",
  adminAuth,
  resultadosParametrosController.getResultadosParametrosByFecha
);

//PUT   /resultados-parametros
router.put(
  "/",
  adminAuth,
  resultadosParametrosController.updateResultadoParametro
);

//PUT /resultados-parametros/byID
router.put(
  "/byID",
  adminAuth,
  resultadosParametrosController.updateResultadoParametroValue
);

//PUT    /resultados-parametros/delete
router.put(
  "/delete",
  adminAuth,
  resultadosParametrosController.deleteResultadoParametro
);

module.exports = router;
