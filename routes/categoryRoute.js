const express = require("express");
const router = express.Router();

const {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} = require("../controllers/categoryController.js");
const verifyTokenFrontliner = require("../middleware/verifyTokenFrontliner.js");

//POST
router.post("/categories/client", getAllCategory);
router.post("/categories", verifyTokenFrontliner, getAllCategory);
router.post("/category/create", createCategory);

//UPDATE
router.put("/category/:id", updateCategory);

//GET

//DELETE
router.delete("/category/:id", verifyTokenFrontliner, deleteCategory);

module.exports = router;
