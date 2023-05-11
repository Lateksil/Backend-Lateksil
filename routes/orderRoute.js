import express from "express";
import {
  CreateOrder,
  getAllOrder,
  getOrderById,
  getOrderByUser,
  updateStatusById,
} from "../controllers/orderController.js";

const router = express.Router();

//POST
router.post("/order/create", CreateOrder);
router.post("/orders", getAllOrder);
router.post("/order", getOrderByUser);
router.post("/order/update", updateStatusById);

//UPDATE

//GET
router.get("/order/:id", getOrderById);
//DELETE

export default router;
