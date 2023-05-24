import express from "express";
import {
  CreateUploadPayment,
  getAllOrderPayment,
} from "../controllers/paymentController.js";
import uploadBuktiPembayaran from "../middleware/UploadBuktiPembayaran.js";

const router = express.Router();

//POST=
router.post("/upload-payment/create", uploadBuktiPembayaran, CreateUploadPayment);
router.post("/payment", getAllOrderPayment);

//UPDATE=

//GET
//DELETE

export default router;
