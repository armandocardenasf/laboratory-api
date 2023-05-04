const express = require("express");
const router = express.Router();
const oRecepcionController = require("../controller/recepcion-controller");
const { adminAuth } = require("../helpers/auth");

router.get("/", adminAuth, oRecepcionController.getRecepcion);

router.post("/", adminAuth, oRecepcionController.insertRecepcion);

router.post(
  "/byCliente",
  adminAuth,
  oRecepcionController.getRecepcionByCliente
);

router.put("/", adminAuth, oRecepcionController.updateRecepcion);

router.put("/delete", adminAuth, oRecepcionController.deleteRecepcion);

module.exports = router;
