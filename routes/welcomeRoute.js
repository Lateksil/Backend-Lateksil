import express from "express";
import { WelcomeController } from "../controllers/welcomeController.js";

const welcomeRouter = express.Router();

welcomeRouter.get("/", WelcomeController);

export default welcomeRouter;
