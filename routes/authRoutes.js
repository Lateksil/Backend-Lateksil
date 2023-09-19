const express = require("express");
const router = express.Router();

const {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyCodeRegister,
  ChangePassword,
} = require("../controllers/authController.js");
const verifyTokenAllRole = require("../middleware/verifyTokenAllRole.js");

// POST
router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.post("/auth/forgot-password", ForgotPassword);
router.post("/auth/change-password", verifyTokenAllRole, ChangePassword);
router.post("/auth/verify", VerifyCodeRegister);

// UPDATE
router.put("/auth/reset-password/:token", ResetPassword);

// GET

// DELETE

module.exports = router;
