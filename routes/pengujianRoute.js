const express = require("express");
const {
  createPengujian,
  deletePengujian,
  getAllPengujian,
  updatePengujian,
  getPengujianById,
  getAllPengujianClient,
} = require("../controllers/pengujianController.js");
const uploadPengujian = require("../middleware/uploadPengujian.js");
const verifyTokenAllRole = require("../middleware/verifyTokenAllRole.js");
const verifyTokenManagerFrontliner = require("../middleware/verifyTokenManagerFrontliner.js");
const router = express.Router();

//POST
router.post("/pengujian/client", getAllPengujianClient);
router.post("/pengujian", verifyTokenAllRole, getAllPengujian);
router.post(
  "/pengujian/create",
  uploadPengujian,
  verifyTokenManagerFrontliner,
  createPengujian
);

//UPDATE
router.put(
  "/pengujian/:id",
  uploadPengujian,
  verifyTokenManagerFrontliner,
  updatePengujian
);
//GET
router.get("/pengujian/:id", getPengujianById);

//DELETE
router.delete("/pengujian/:id", verifyTokenManagerFrontliner, deletePengujian);

module.exports = router;
