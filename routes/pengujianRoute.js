import express from "express";
import {
  createPengujian,
  deletePengujian,
  getAllPengujian,
  updatePengujian,
} from "../controllers/pengujianController.js";
import uploadPengujian from "../middleware/uploadPengujian.js";
import { verifyTokenAllRole } from "../middleware/verifyTokenAllRole.js";
import { verifyTokenFrontliner } from "../middleware/verifyTokenFrontliner.js";
const router = express.Router();

//POST
router.post("/pengujian/client", getAllPengujian);
router.post("/pengujian", verifyTokenAllRole, getAllPengujian);
router.post(
  "/pengujian/create",
  uploadPengujian,
  verifyTokenFrontliner,
  createPengujian
);

//UPDATE
router.put(
  "/pengujian/:id",
  uploadPengujian,
  verifyTokenFrontliner,
  updatePengujian
);
//GET

//DELETE
router.delete("/pengujian/:id", verifyTokenFrontliner, deletePengujian);

export default router;
