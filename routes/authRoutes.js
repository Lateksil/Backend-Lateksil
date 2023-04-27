import express from "express";
const router = express.Router();

import {
  Login,
  Register,
  VerifyCodeRegister,
} from "../controllers/authController.js";

//POST
router.post("/auth/register", Register);
router.post("/auth/verify", VerifyCodeRegister);
router.post("/auth/login", Login);

//UPDATE

//GET

//DELETE

export default router;
