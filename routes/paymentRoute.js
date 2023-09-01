const express = require("express");
const {
  CreateUploadPayment,
  getAllOrderPayment,
  getPaymentByIdOrder,
  uploadKwitansiToCostumer,
} = require("../controllers/paymentController.js");
const uploadBuktiPembayaran = require("../middleware/UploadBuktiPembayaran.js");
const uploadKwitansiPembayaran = require("../middleware/uploadKwitansiPembayaran.js");

const router = express.Router();

//POST
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

//UPDATE

//GET
router.get("/payment/:id", getPaymentByIdOrder);
//DELETE

module.exports = router;
