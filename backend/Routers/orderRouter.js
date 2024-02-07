const express = require("express");
const router = express.Router();
const { addOrder, getOrderUser } = require("../controller/orderController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId/:meja", verifyUser("customer"), addOrder);
router.get("/get/:userId", verifyUser("customer"), getOrderUser);

module.exports = router;
