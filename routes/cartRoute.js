import express from "express";
import {
  createCart,
  getCartByUserId,
} from "../controllers/cartController.js";
const router = express.Router();

//POST
router.post("/cart", createCart);
router.post("/cart/me", getCartByUserId);

//UPDATE

//GET

//DELETE

export default router;
