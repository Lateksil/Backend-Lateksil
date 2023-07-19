import express from "express";
import {
  CreateOrder,
  downloadResultFilePDF,
  getAlatPengujianByOrderId,
  getAllOrder,
  getAllPersetujuanPesanan,
  getAllProsesPengujian,
  getAllSelesaiPengerjaan,
  getAllTahapPengerjaan,
  getOrderById,
  getOrderByUser,
  uploadResultFileByIdOrder,
} from "../controllers/orderController.js";
import { createCatatanToPeralatan } from "../controllers/peralatanController.js";
import uploadResultPengujian from "../middleware/uploadResultPengujian.js";

const router = express.Router();

//POST
router.post("/order/create", CreateOrder);
router.post("/orders", getAllOrder);
router.post("/order", getOrderByUser);

router.post("/manager/persetujuan_pesanan", getAllPersetujuanPesanan);

router.post("/proses-pengujian", getAllProsesPengujian);

router.post("/tahap-pengerjaan", getAllTahapPengerjaan);
router.post("/order/selesai-pemesanan", getAllSelesaiPengerjaan);
router.post(
  "/order/upload-result",
  uploadResultPengujian,
  uploadResultFileByIdOrder
);

//UPDATE
router.put("/to_tahap_pengujian", createCatatanToPeralatan);

//GET
router.get("/order/:id", getOrderById);
router.get("/view-result/download/:name", downloadResultFilePDF);

router.get("/order/peralatan/:id", getAlatPengujianByOrderId);
//DELETE

export default router;
