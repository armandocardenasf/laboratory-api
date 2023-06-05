const express = require("express");
const router = express.Router();
const oRecepcionController = require("../controller/recepcion-controller");
const { adminAuth, authUserAndClient } = require("../helpers/auth");

router.get("/", adminAuth, oRecepcionController.getRecepcion);

router.post("/", adminAuth, oRecepcionController.insertRecepcion);

router.post(
  "/byCliente",
  authUserAndClient,
  oRecepcionController.getRecepcionByCliente
);

router.put("/", adminAuth, oRecepcionController.updateRecepcion);

router.put("/delete", adminAuth, oRecepcionController.deleteRecepcion);
router.put(
  "/update/estado",
  adminAuth,
  oRecepcionController.updateEstadoRecepcion
);
module.exports = router;
