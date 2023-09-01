const express = require("express");
const {
  createCatatanToPeralatan,
  createPeralatan,
  deletePeralatan,
  getAllPeralatan,
  GetOrderPeralatan,
  getStatusPerlatan,
  uploadBuktiAlat,
} = require("../controllers/peralatanController.js");
const uploadBuktiPengajuanAlat = require("../middleware/uploadBuktiPengajuanAlat.js");

const router = express.Router();

//POST
router.post("/peralatan/create", createPeralatan);
router.post("/peralatan", getAllPeralatan);

router.post("/peralatan/pengajuan", GetOrderPeralatan);

//UPDATE
router.put("/to_tahap_pengujian", createCatatanToPeralatan);

router.put(
  "/peralatan/pengajuan/:id_order",
  uploadBuktiPengajuanAlat,
  uploadBuktiAlat
);

//GET
router.get("/peralatan/status/:id", getStatusPerlatan);

//DELETE
router.delete("/peralatan/:id", deletePeralatan);

module.exports = router;
