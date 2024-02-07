const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUser } = require("../controller/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/get", getAllUser);

module.exports = router;
