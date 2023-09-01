const express = require('express');
const {
  createCart,
  deleteCart,
  getCartByUserId,
} = require('../controllers/cartController.js');
const router = express.Router();

// POST
router.post('/cart/create', createCart);
router.post('/cart', getCartByUserId);

// UPDATE

// GET

// DELETE
router.delete('/cart/:id', deleteCart);

module.exports = router;
