const express = require("express");
const router = express.Router();
const { addBalance } = require("../controller/walletController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId", verifyUser("customer"), addBalance);

module.exports = router;
