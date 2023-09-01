const express = require("express");
const {
  SendManagerOrder,
  SendToFronlinerOrder,
} = require("../controllers/projectController.js");
const router = express.Router();

//POST
router.put("/project", SendManagerOrder);
router.put("/m/project", SendToFronlinerOrder);

//UPDATE

//GET

//DELETE

module.exports = router;
