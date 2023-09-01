const express = require('express');
const router = express.Router();

const { Login, Register } = require('../controllers/authController.js');

// POST
router.post('/auth/register', Register);
router.post('/auth/login', Login);

// UPDATE

// GET

// DELETE

module.exports = router;
