const express = require("express");
const {
  createPengujian,
  deletePengujian,
  getAllPengujian,
  updatePengujian,
} = require("../controllers/pengujianController.js");
const uploadPengujian = require("../middleware/uploadPengujian.js");
const verifyTokenAllRole = require("../middleware/verifyTokenAllRole.js");
const verifyTokenFrontliner = require("../middleware/verifyTokenFrontliner.js");
const router = express.Router();

//POST
router.post("/pengujian/client", getAllPengujian);
router.post("/pengujian", verifyTokenAllRole, getAllPengujian);
router.post(
  "/pengujian/create",
  uploadPengujian,
  verifyTokenFrontliner,
  createPengujian
);

//UPDATE
router.put(
  "/pengujian/:id",
  uploadPengujian,
  verifyTokenFrontliner,
  updatePengujian
);
//GET

//DELETE
router.delete("/pengujian/:id", verifyTokenFrontliner, deletePengujian);

module.exports = router;
