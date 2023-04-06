import express from "express";
const router = express.Router();

import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";

//POST
router.post("/product/create", createProduct);

//UPDATE

//GET
router.get("/products", getProducts);

//DELETE

export default router;
