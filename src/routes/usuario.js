const express = require("express");
const oUsuarioController = require("../controller/usuario-controller");
const { adminAuth, clientAuth } = require("../helpers/auth");
const router = express.Router();

//GET   /usuario
router.get("/", adminAuth, oUsuarioController.getUsuarios);

//POST   /usuario/byid
router.post("/byid", adminAuth, oUsuarioController.getUsuarioById);

//POST  /usuario
router.post("/", adminAuth, oUsuarioController.insertUsuario);

//PUT   /usuario
router.put("/", adminAuth, oUsuarioController.updateUsuario);

//PUT   /usuario/pass
router.put("/pass", adminAuth, oUsuarioController.updatePass);

//PUT   /usuario/delete
router.put("/delete", adminAuth, oUsuarioController.deleteUsuario);

/* 
  The following routes are for testing purposes only.
*/

//POST    /usuario/secured/admin
router.post("/secured/admin", adminAuth, oUsuarioController.securedRouteAdmin);

//POST    /usuario/secured/client
router.post(
  "/secured/client",
  clientAuth,
  oUsuarioController.securedRouteClient
);

/*
  The following routes are crucial for the authentication of the application.
*/

//POST   /usuario/tokens
router.post("/tokens", oUsuarioController.getAccessTokens); // retrieves a token and refreshToken neccessary for making the request.

//POST   /usuario/login
router.post("/login", oUsuarioController.getLogin); // retrieves the user's general information.

//POST    /usuario/token/refresh
router.post("/token/refresh", oUsuarioController.getNewTokenWithRefreshToken); // post the refreshToken and get a token which is valid for 15min neccessary for making other requests.

module.exports = router;
