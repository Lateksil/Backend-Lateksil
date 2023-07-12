import express from "express";
import {
  CreateOrder,
  getAllOrder,
  getAllPersetujuanPesanan,
  getAllTahapPengerjaan,
  getOrderById,
  getOrderByUser,
  uploadResultFileByIdOrder,
} from "../controllers/orderController.js";
import uploadResultPengujian from "../middleware/uploadResultPengujian.js";

const router = express.Router();

//POST
router.post("/order/create", CreateOrder);
router.post("/orders", getAllOrder);
router.post("/order", getOrderByUser);

router.post("/manager/persetujuan_pesanan", getAllPersetujuanPesanan);

router.post("/tahap-pengerjaan", getAllTahapPengerjaan);
router.post(
  "/order/upload-result",
  uploadResultPengujian,
  uploadResultFileByIdOrder
);

//UPDATE

//GET
router.get("/order/:id", getOrderById);
//DELETE

export default router;
