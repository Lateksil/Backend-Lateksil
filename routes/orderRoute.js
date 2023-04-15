import express from "express";
import { CreateOrder, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

//POST
router.post("/order/create", CreateOrder);
router.post("/order", getOrderById);

//UPDATE

//GET

//DELETE

export default router;
