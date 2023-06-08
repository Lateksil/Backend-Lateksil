import express from "express";
import {
  CreateTeknisiPengujian,
  GetAllTeknisi,
  GetAllTeknisiPengujian,
  GetTeknisiByOrder,
  GetTeknisiByUserId,
} from "../controllers/teknisiController.js";
const router = express.Router();

//POST
router.post("/teknisi", GetTeknisiByUserId);
router.post("/teknisi/all", GetAllTeknisi);

router.post("/pengujian_teknisi/create", CreateTeknisiPengujian);
router.post("/pengujian_teknisi", GetAllTeknisiPengujian);

//UPDATE

//GET
router.get("/teknisi_in_order/:id", GetTeknisiByOrder);

//DELETE

export default router;
