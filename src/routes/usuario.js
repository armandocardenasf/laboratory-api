const express = require("express");
const oUsuarioController = require("../controller/usuario-controller");
const router = express.Router();
const auth = require("../helpers/auth");

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

//POST   /usuario/login
router.post("/login", oUsuarioController.getLogin);

//POST   /usuario/tokens
router.post("/tokens", oUsuarioController.getAccessTokens);

//GET    /usuario/secured/admin
router.get(
  "/secured/admin",
  auth.adminAuth,
  oUsuarioController.securedRouteAdmin
);

//GET    /usuario/secured/client
router.get(
  "/secured/client",
  auth.clientAuth,
  oUsuarioController.securedRouteClient
);

module.exports = router;
