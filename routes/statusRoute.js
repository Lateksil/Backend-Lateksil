import express from "express";
import {
  AddTeknisiAndPeralatanToTahapPengerjaan,
  updateStatusToCostumer,
} from "../controllers/statusController.js";
const router = express.Router();

//POST
router.put("/send_costumer", updateStatusToCostumer);
router.put("/to_tahap_pengujian", AddTeknisiAndPeralatanToTahapPengerjaan);

//UPDATE

//GET

//DELETE

export default router;
