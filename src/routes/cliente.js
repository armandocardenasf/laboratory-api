const express = require("express");
const clienteController = require("../controller/cliente-controller");
const { adminAuth, authUserAndClient } = require("../helpers/auth");
const router = express.Router();

//GET   /cliente
router.get("/", adminAuth, clienteController.getCliente);

//POST   /cliente/byid
router.post("/byid", adminAuth, clienteController.getClienteById);

//POST   /cliente/byid
router.post("/byExternoId", authUserAndClient, clienteController.getClienteByExternoId);

//POST  /cliente
router.post("/", adminAuth, clienteController.insertCliente);

//PUT   /cliente
router.put("/", adminAuth, clienteController.updateCliente);

//PUT   /cliente/delete
router.put("/delete", adminAuth, clienteController.deleteCliente);

module.exports = router;
