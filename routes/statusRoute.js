import express from "express";
import { updateStatusToCostumer } from "../controllers/statusController.js";
const router = express.Router();

//POST
router.put("/send_costumer", updateStatusToCostumer);

//UPDATE

//GET

//DELETE

export default router;
