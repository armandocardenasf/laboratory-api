const express = require("express");
const clienteController = require("../controller/cliente-controller");
const router = express.Router();

//GET   /cliente
router.get("/", clienteController.getCliente);

//POST   /cliente/byid
router.post("/byid", clienteController.getClienteById);
//POST   /cliente/byid
router.post("/byExternoId", clienteController.getClienteByExternoId);

//POST  /cliente
router.post("/", clienteController.insertCliente);

//PUT   /cliente
router.put("/", clienteController.updateCliente);

//PUT   /cliente/delete
router.put("/delete", clienteController.deleteCliente);

module.exports = router;
