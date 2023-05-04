const express = require("express");

const suscriptionsController = require("../controller/suscripciones-controller");
const { adminAuth } = require("../helpers/auth");

const router = express.Router();

//GET /suscripciones
router.get("/", adminAuth, suscriptionsController.getSuscripciones);

//POST /suscripciones/ById
router.post("/ById", adminAuth, suscriptionsController.getSuscripcionesById);

module.exports = router;
