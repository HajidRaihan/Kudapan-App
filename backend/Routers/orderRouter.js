const express = require("express");
const router = express.Router();
const { addOrder } = require("../controller/orderController");

router.post("/add/:userId/:meja", addOrder);

module.exports = router;
