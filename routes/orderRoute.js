import express from "express";
import {
  CreateOrder,
  getAllOrder,
  getAllOrderManager,
  getAllTahapPengujian,
  getOrderById,
  getOrderByUser,
} from "../controllers/orderController.js";

const router = express.Router();

//POST
router.post("/order/create", CreateOrder);
router.post("/orders", getAllOrder);
router.post("/order", getOrderByUser);

router.post("/m/orders", getAllOrderManager);

router.post("/tahap-pengujian", getAllTahapPengujian);

//UPDATE

//GET
router.get("/order/:id", getOrderById);
//DELETE

export default router;
