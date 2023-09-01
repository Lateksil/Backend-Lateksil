const express = require("express");
const {
  CreateTeknisiPengujian,
  deleteTeknisiPengujian,
  downloadTaskPengujianPDF,
  GetAllTeknisi,
  GetAllTeknisiPengujian,
  GetTeknisiByOrder,
  GetTeknisiByUserId,
  uploadLaporanTeknisi,
  viewTaskPengujianPDF,
} = require("../controllers/teknisiController.js");
const uploadTaskPengujianTeknisi = require("../middleware/uploadTaskPengujianTeknisi.js");

const router = express.Router();

router.post("/teknisi", GetTeknisiByUserId);

router.post("/teknisi/all", GetAllTeknisi);

router.post(
  "/teknisi/progress_task",
  uploadTaskPengujianTeknisi,
  uploadLaporanTeknisi
);

// POST
router.post("/pengujian_teknisi/create", CreateTeknisiPengujian);
router.post("/pengujian_teknisi", GetAllTeknisiPengujian);

// GET
router.get("/teknisi_in_order/:id", GetTeknisiByOrder);
router.get("/view-task/:name", viewTaskPengujianPDF);
router.get("/view-task/download/:name", downloadTaskPengujianPDF);

//UPDATE

// DELETE
router.delete("/teknisi/:id", deleteTeknisiPengujian);

module.exports = router;
