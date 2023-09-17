const express = require("express");
const {
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
} = require("../controllers/orderController.js");
const uploadResultPengujian = require("../middleware/uploadResultPengujian.js");
const verifyTokenUser = require("../middleware/verifyTokenUser.js");

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

//GET
router.get("/order/:id", verifyTokenUser, getOrderById);
router.get("/view-result/download/:name", downloadResultFilePDF);

router.get("/order/peralatan/:id", getAlatPengujianByOrderId);
//DELETE

module.exports = router;
