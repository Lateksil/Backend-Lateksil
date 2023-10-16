const express = require("express");
const router = express.Router();

const {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
  getAllCategoryClient,
} = require("../controllers/categoryController.js");
const verifyTokenManagerFrontliner = require("../middleware/verifyTokenManagerFrontliner.js");

//POST
router.post("/categories/client", getAllCategoryClient);
router.post("/categories", verifyTokenManagerFrontliner, getAllCategory);
router.post("/category/create", verifyTokenManagerFrontliner, createCategory);

//UPDATE
router.put("/category/:id", verifyTokenManagerFrontliner, updateCategory);

//GET

//DELETE
router.delete("/category/:id", verifyTokenManagerFrontliner, deleteCategory);

module.exports = router;
