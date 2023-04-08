import express from "express";
const router = express.Router();

import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { verifyTokenFrontliner } from "../middleware/verifyTokenFrontliner.js";

//POST
router.post("/categories/client", getAllCategory);
router.post("/categories", verifyTokenFrontliner, getAllCategory);
router.post("/category/create", createCategory);

//UPDATE
router.put("/category/:id", updateCategory);

//GET

//DELETE
router.delete("/category/:id", verifyTokenFrontliner, deleteCategory);

export default router;
