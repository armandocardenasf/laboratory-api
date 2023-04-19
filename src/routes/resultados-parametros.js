const express = require("express");
const resultadosParametrosController = require("../controller/resultados-parametros-controller");
const router = express.Router();

//GET   /resultados-parametros/all/:resultId
router.get(
  "/all/:resultId",
  resultadosParametrosController.getResultadosParametrosByResultadoId
);

//GET   /resultados-parametros/:parameterId
router.get(
  "/:parameterId",
  resultadosParametrosController.getResultadosParametrosByParameterId
);

//POST /resultados-parametros
router.post("/", resultadosParametrosController.createResultadoParametro);

//POST  /resultados-parametros/date
router.post(
  "/date",
  resultadosParametrosController.getResultadosParametrosByFecha
);

//PUT   /resultados-parametros
router.put("/", resultadosParametrosController.updateResultadoParametro);
//PUT /resultados-parametros/byID
router.put(
  "/byID",
  resultadosParametrosController.updateResultadoParametroValue
);

//PUT    /resultados-parametros/delete
router.put("/delete", resultadosParametrosController.deleteResultadoParametro);

module.exports = router;
