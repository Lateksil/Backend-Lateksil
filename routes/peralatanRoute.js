import express from "express";
import {
  createPeralatan,
  deletePeralatan,
  getAllPeralatan,
  GetOrderPeralatan,
  getStatusPerlatan,
  updateStatusPengajuanPeralatan,
} from "../controllers/peralatanController.js";
import uploadBuktiPengajuanAlat from "../middleware/uploadBuktiPengajuanAlat.js";

const router = express.Router();

//POST
router.post("/peralatan/create", createPeralatan);
router.post("/peralatan", getAllPeralatan);

router.post("/peralatan/pengajuan", GetOrderPeralatan);

//UPDATE
router.put(
  "/peralatan/pengajuan/:id_order",
  uploadBuktiPengajuanAlat,
  updateStatusPengajuanPeralatan
);

//GET
router.get("/peralatan/status/:id", getStatusPerlatan);


//DELETE
router.delete("/peralatan/:id", deletePeralatan);

export default router;
