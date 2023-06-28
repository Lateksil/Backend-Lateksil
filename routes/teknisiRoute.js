import express from "express";
import {
  addTeknisi,
  CreateTeknisiPengujian,
  downloadTaskPengujianPDF,
  GetAllTeknisi,
  GetAllTeknisiPengujian,
  GetTeknisiByOrder,
  GetTeknisiByUserId,
  StatusPengerjaanTeknisi,
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
  StatusPengerjaanTeknisi
);

router.post("/pengujian_teknisi/create", CreateTeknisiPengujian);
router.post("/pengujian_teknisi", GetAllTeknisiPengujian);

//UPDATE

//GET
router.get("/teknisi_in_order/:id", GetTeknisiByOrder);
router.get("/view-task/:name", viewTaskPengujianPDF);
router.get("/view-task/download/:name", downloadTaskPengujianPDF);


//TESS
router.get("/add-Teknisi", addTeknisi);

//DELETE

export default router;
