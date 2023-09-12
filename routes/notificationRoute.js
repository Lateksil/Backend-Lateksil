const express = require("express");
const { riwayatTransactionNotif } = require("../controllers/notificationController");
const router = express.Router();

// GET
router.get("/notif/history-transaction/:id", riwayatTransactionNotif);

// DELETE

module.exports = router;
