import express from "express";
import {
  CreateUploadPayment,
  getAllAcceptPayment,
  getAllOrderPayment,
  getPaymentByIdOrder,
  uploadKwitansiToCostumer,
} from "../controllers/paymentController.js";
import uploadBuktiPembayaran from "../middleware/UploadBuktiPembayaran.js";
import uploadKwitansiPembayaran from "../middleware/uploadKwitansiPembayaran.js";

const router = express.Router();

//POST=
router.post(
  "/upload-payment/create",
  uploadBuktiPembayaran,
  CreateUploadPayment
);
router.post(
  "/upload-kwitansi",
  uploadKwitansiPembayaran,
  uploadKwitansiToCostumer
);
router.post("/payment", getAllOrderPayment);

router.post("/proses-pengujian", getAllAcceptPayment);

//UPDATE=

//GET
router.get("/payment/:id", getPaymentByIdOrder);
//DELETE

export default router;
