import express from "express";
import {
  SendManagerOrder,
  SendToFronlineOrder,
} from "../controllers/projectController.js";
const router = express.Router();

//POST
router.put("/project", SendManagerOrder);
router.put("/m/project", SendToFronlineOrder);

//UPDATE

//GET

//DELETE

export default router;
