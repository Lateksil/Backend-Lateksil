import express from "express";
import {
  SendManagerOrder,
  SendToFronlinerOrder,
} from "../controllers/projectController.js";
const router = express.Router();

//POST
router.put("/project", SendManagerOrder);
router.put("/m/project", SendToFronlinerOrder);

//UPDATE

//GET

//DELETE

export default router;
