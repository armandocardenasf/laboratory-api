const express = require("express");

const rolesController = require("../controller/roles-controller");

const router = express.Router();

//GET /roles
router.get("/", rolesController.getRoles);
//POST /roles/ById
router.get("/ById", rolesController.getRolesById);

module.exports = router;
