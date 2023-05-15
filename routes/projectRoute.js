import express from "express";
import { SendManagerOrder } from "../controllers/projectController.js";
const router = express.Router();

//POST
router.post("/project", SendManagerOrder);

//UPDATE

//GET

//DELETE

export default router;
