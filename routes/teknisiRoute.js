import express from "express";
import {
  CreateTeknisiPengujian,
  deleteTeknisiPengujian,
  downloadTaskPengujianPDF,
  GetAllTeknisi,
  GetAllTeknisiPengujian,
  GetTeknisiByOrder,
  GetTeknisiByUserId,
  uploadLaporanTeknisi,
  viewTaskPengujianPDF,
} from "../controllers/teknisiController.js";
import uploadTaskPengujianTeknisi from "../middleware/UploadTaskPengujianTeknisi.js";
const router = express.Router();

//POST
router.post("/teknisi", GetTeknisiByUserId);
router.post("/teknisi/all", GetAllTeknisi);

router.post(
  "/teknisi/progress_task",
  uploadTaskPengujianTeknisi,
  uploadLaporanTeknisi
);

router.post("/pengujian_teknisi/create", CreateTeknisiPengujian);
router.post("/pengujian_teknisi", GetAllTeknisiPengujian);

//UPDATE

//GET
router.get("/teknisi_in_order/:id", GetTeknisiByOrder);
router.get("/view-task/:name", viewTaskPengujianPDF);
router.get("/view-task/download/:name", downloadTaskPengujianPDF);

//DELETE
router.delete("/teknisi/:id", deleteTeknisiPengujian);

export default router;
