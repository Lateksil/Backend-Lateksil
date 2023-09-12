const express = require("express");
const {
  ActiveMethodTransaction,
  CreateMethodTransaction,
  getActiveMethodTransaction,
  getAllMethodTransaction,
  deleteMethodTransaction,
} = require("../controllers/methodTransactionController.js");

const router = express.Router();

//POST
router.post("/method_transaction/all", getAllMethodTransaction);
router.post("/method_transaction/create", CreateMethodTransaction);

//UPDATE
router.put("/method_transaction/:id", ActiveMethodTransaction);

//GET
router.get("/method_transaction", getActiveMethodTransaction);
//DELETE
router.delete("/method_transaction/:id", deleteMethodTransaction);

module.exports = router;
