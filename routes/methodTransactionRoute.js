import express from "express";
import {
  ActiveMethodTransaction,
  CreateMethodTransaction,
  getActiveMethodTransaction,
  getAllMethodTransaction,
} from "../controllers/methodTransactionController.js";

const router = express.Router();

//POST
router.post("/method_transaction/all", getAllMethodTransaction);
router.post("/method_transaction/create", CreateMethodTransaction);

//UPDATE
router.put("/method_transaction/:id", ActiveMethodTransaction);

//GET
router.get("/method_transaction", getActiveMethodTransaction);
//DELETE

export default router;
