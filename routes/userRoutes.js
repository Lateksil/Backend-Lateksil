const express = require("express");
const router = express.Router();

const {
  AllUsers,
  deleteUser,
  infoUser,
  updateUser,
} = require("../controllers/userController.js");
const verifyTokenAllRole = require("../middleware/verifyTokenAllRole.js");
const uploadProfleUser = require("../middleware/uploadProfileUser.js");

// POST
router.post("/users", AllUsers);

// UPDATE
router.put("/users/:id", uploadProfleUser, updateUser);

// GET
router.get("/me/:email", verifyTokenAllRole, infoUser);

// DELETE
router.delete("/users/:id", deleteUser);

module.exports = router;
