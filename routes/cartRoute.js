import express from "express";
import {
  createCart,
  deleteCart,
  getCartByUserId,
} from "../controllers/cartController.js";
const router = express.Router();

//POST
router.post("/cart/create", createCart);
router.post("/cart", getCartByUserId);

//UPDATE

//GET

//DELETE
router.delete("/cart/:id", deleteCart);

export default router;
