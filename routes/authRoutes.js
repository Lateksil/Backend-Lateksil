const express = require('express');
const router = express.Router();

const { Login, Register, ForgotPassword } = require('../controllers/authController.js');

// POST
router.post('/auth/register', Register);
router.post('/auth/login', Login);

// UPDATE

// GET
router.get('/auth/forgot-password/:email', ForgotPassword);

// DELETE

module.exports = router;
