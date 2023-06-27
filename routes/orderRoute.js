import express from "express";
import {
  CreateOrder,
  getAllOrder,
  getAllPersetujuanPesanan,
  getAllTahapPengerjaan,
  getOrderById,
  getOrderByUser,
} from "../controllers/orderController.js";
import { verifyTokenUser } from "../middleware/verifyTokenUser.js";

const router = express.Router();

//POST
router.post("/order/create", CreateOrder);
router.post("/orders", getAllOrder);
router.post("/order", getOrderByUser);

router.post("/manager/persetujuan_pesanan", getAllPersetujuanPesanan);

router.post("/tahap-pengerjaan", getAllTahapPengerjaan);

//UPDATE

//GET
router.get("/order/:id", getOrderById);
//DELETE

export default router;
