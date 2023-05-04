const express = require("express");
const usuarioResultadosController = require("../controller/usuario-resultados-controller");
const { adminAuth } = require("../helpers/auth");
const router = express.Router();

//PUT   /cliente/delete
router.put("/delete", adminAuth, usuarioResultadosController.deleteAnalisis);

module.exports = router;
