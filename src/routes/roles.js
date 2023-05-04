const express = require("express");
const rolesController = require("../controller/roles-controller");
const { adminAuth } = require("../helpers/auth");
const router = express.Router();

//GET /roles
router.get("/", adminAuth, rolesController.getRoles);

//POST /roles/ById
router.post("/ById", adminAuth, rolesController.getRolesById);

module.exports = router;
