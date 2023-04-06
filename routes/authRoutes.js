import express from "express";
const router = express.Router();

import { Login, Register } from "../controllers/authController.js";

//POST
router.post("/auth/register", Register);
router.post("/auth/login", Login);

//UPDATE

//GET

//DELETE

export default router;
