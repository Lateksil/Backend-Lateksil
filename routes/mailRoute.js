const express = require("express");
const { SendVerificationEmail, sendEmailTahapPermintaan } = require("../controllers/mailController");
const router = express.Router();

// POST
router.post("/mail/sendVerification", SendVerificationEmail);

// UPDATE

// GET
router.get("/mail/tahap_permintaan", sendEmailTahapPermintaan);

// DELETE

module.exports = router;
