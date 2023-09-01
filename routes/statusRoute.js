const express = require("express");
const {
  updateDonePengujianPemesanan,
  updateStatusToCostumer,
} = require("../controllers/statusController.js");
const router = express.Router();

//POST

//UPDATE
router.put("/send_costumer", updateStatusToCostumer);

//GET
router.put("/status/to_done_pemesanan", updateDonePengujianPemesanan);

//DELETE

module.exports = router;
