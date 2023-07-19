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
router.get("/status/to_done_pemesanan/:order_id", updateDonePengujianPemesanan);

//DELETE

export default router;
