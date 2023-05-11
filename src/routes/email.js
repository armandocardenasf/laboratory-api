const express = require("express");
const router = express.Router();
const emailController = require("../controller/email-controller");
const { adminAuth } = require("../helpers/auth");

// POST: /email/send
router.post("/send", adminAuth, emailController.sendEmail); // Send email

module.exports = router;
