import express from "express";
import { CreateActorMovie, getActorMovie } from "../controllers/movieController.js";

const router = express.Router();

//POST
router.post("/movie", CreateActorMovie);

//UPDATE

//GET
router.get("/movie", getActorMovie);

//DELETE

export default router;
