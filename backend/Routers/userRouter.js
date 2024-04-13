const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
} = require("../controller/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/get", getAllUser);
router.get("/get/:id", getUserById);

module.exports = router;
