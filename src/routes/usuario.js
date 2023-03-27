const express = require("express");
const oUsuarioController = require("../controller/usuario-controller");
const router = express.Router();

//GET   /usuario
router.get("/", oUsuarioController.getUsuarios);

//POST   /usuario/byid
router.post("/byid", oUsuarioController.getUsuarioById);

//POST  /usuario
router.post("/", oUsuarioController.insertUsuario);

//PUT   /usuario
router.put("/", oUsuarioController.updateUsuario);

//PUT   /usuario/pass
router.put("/pass", oUsuarioController.updatePass);

//PUT   /usuario/delete
router.put("/delete", oUsuarioController.deleteUsuario);

//GET   /usuario/login
router.post("/login", oUsuarioController.getLogin);

module.exports = router;
