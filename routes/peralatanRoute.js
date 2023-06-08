import express from "express";
import { createPeralatan, getAlatPengujianByOrderId, getAllPeralatan, GetOrderPeralatan } from "../controllers/peralatanController.js";

const router = express.Router();

//POST
router.post("/peralatan/create", createPeralatan);
router.post("/peralatan", getAllPeralatan);

//UPDATE

//GET
router.get("/peralatan", GetOrderPeralatan);
router.get("/peralatan/order/:id", getAlatPengujianByOrderId);

//DELETE

export default router;
