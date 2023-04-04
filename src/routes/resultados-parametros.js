const express = require('express');
const resultadosParametrosController = require('../controller/parametros-resultados-controller'); 
const router = express.Router();


//GET   /resultados-parametros/all/:resultId
router.get("/all/:resultId", parametrosController.getParametrosByResultadoId);

//GET   /resultados-parametros/:resultParameterId
router.get("/:resultParameterId", parametrosController.getParametroById);

//POST  /resultados-parametros/date
router.post("/date", parametrosController.getParametrosByFecha);

//PUT   /resultados-parametros/:resultParameterId

module.exports = router;
