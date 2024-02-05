const express = require("express");
const router = express.Router();
const { addOrder, getOrderUser } = require("../controller/orderController");

router.post("/add/:userId/:meja", addOrder);
router.post("/get/:userId", getOrderUser);

module.exports = router;
