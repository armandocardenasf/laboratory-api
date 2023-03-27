const express = require("express");
const clienteController = require("../controller/cliente-controller");
const router = express.Router();

//GET   /cliente
router.get("/", clienteController.getCliente);

//GET   /cliente/byid
router.post("/byid", clienteController.getClienteById);

//POST  /cliente
router.post("/", clienteController.insertCliente);

//PUT   /cliente
router.put("/", clienteController.updateCliente);

//PUT   /cliente/delete
router.put("/delete", clienteController.deleteCliente);

module.exports = router;
