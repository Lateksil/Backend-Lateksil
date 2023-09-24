const express = require("express");
const { SendVerificationEmail } = require("../controllers/mailController");
const router = express.Router();

// POST
router.post("/mail/sendVerification", SendVerificationEmail);

// UPDATE

// GET

// DELETE

module.exports = router;
