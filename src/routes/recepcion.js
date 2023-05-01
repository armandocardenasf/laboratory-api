const express = require("express");
const router = express.Router();
const oRecepcionController = require("../controller/recepcion-controller");

router.get("/", oRecepcionController.getRecepcion);

router.post("/", oRecepcionController.insertRecepcion);

router.post("/byCliente", oRecepcionController.getRecepcionByCliente);

router.put("/", oRecepcionController.updateRecepcion);

router.put("/delete", oRecepcionController.deleteRecepcion);

module.exports = router;
