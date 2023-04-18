const express = require("express");
const usuarioResultadosController = require("../controller/usuario-resultados-controller");
const router = express.Router();

//PUT   /cliente/delete
router.put("/delete", usuarioResultadosController.deleteAnalisis);

module.exports = router;
