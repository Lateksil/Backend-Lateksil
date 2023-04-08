import express from "express";
import {
  createPengujian,
  deletePengujian,
  getAllPengujian,
  updatePengujian,
} from "../controllers/pengujianController.js";
import upload from "../middleware/upload.js";
import { verifyTokenAllRole } from "../middleware/verifyTokenAllRole.js";
import { verifyTokenFrontliner } from "../middleware/verifyTokenFrontliner.js";
const router = express.Router();

//POST
router.post("/pengujian/client", getAllPengujian);
router.post("/pengujian", verifyTokenAllRole, getAllPengujian);
router.post(
  "/pengujian/create",
  upload,
  verifyTokenFrontliner,
  createPengujian
);

//UPDATE
router.put("/pengujian/:id",verifyTokenFrontliner, updatePengujian);
//GET

//DELETE
router.delete("/pengujian/:id", verifyTokenFrontliner, deletePengujian);

export default router;
