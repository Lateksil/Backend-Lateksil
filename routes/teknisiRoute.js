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
  GetRiwayatTeknisiStandById,
  GetRiwayatTeknisiOnGoingById,
  GetDetailRiwayatByIdTeknisiPengujian,
} = require("../controllers/teknisiController.js");
const uploadTaskPengujianTeknisi = require("../middleware/uploadTaskPengujianTeknisi.js");
const verifyTokenManager = require("../middleware/verifyTokenManager.js");

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

router.get(
  "/teknisi/riwayat/:id",
  // verifyTokenManager,
  GetDetailRiwayatByIdTeknisiPengujian
);

router.get(
  "/teknisi/riwayat/standby/:id",
  verifyTokenManager,
  GetRiwayatTeknisiStandById
);
router.get(
  "/teknisi/riwayat/on_going/:id",
  verifyTokenManager,
  GetRiwayatTeknisiOnGoingById
);

//UPDATE

// DELETE
router.delete("/teknisi/:id", deleteTeknisiPengujian);

module.exports = router;
