const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrderUser,
  addSingleOrder,
  changeStatusOrder,
} = require("../controller/orderController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId/:meja", verifyUser("customer"), addOrder);
router.post("/add/single/:userId/:meja", addSingleOrder);
router.get("/get/:userId", getOrderUser);
router.post("/status/:userId/:orderId", changeStatusOrder);

module.exports = router;
