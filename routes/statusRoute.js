import express from "express";
import {
  updateDonePengujianPemesanan,
  updateStatusToCostumer,
} from "../controllers/statusController.js";
const router = express.Router();

//POST

//UPDATE
router.put("/send_costumer", updateStatusToCostumer);

//GET
router.put("/status/to_done_pemesanan", updateDonePengujianPemesanan);

//DELETE

export default router;
