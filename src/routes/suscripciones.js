const express = require("express");

const suscriptionsController = require("../controller/suscripciones-controller");

const router = express.Router();

//GET /suscripciones
router.get("/", suscriptionsController.getSuscripciones);
//POST /suscripciones/ById
router.post("/ById", suscriptionsController.getSuscripcionesById);

module.exports = router;
