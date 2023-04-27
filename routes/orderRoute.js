import express from "express";
import {
  CreateOrder,
  getOrderById,
  updateStatusById,
} from "../controllers/orderController.js";

const router = express.Router();

//POST
router.post("/order/create", CreateOrder);
router.post("/order", getOrderById);
router.post("/order/update", updateStatusById);

//UPDATE

//GET

//DELETE

export default router;
