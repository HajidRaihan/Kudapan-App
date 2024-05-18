const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrderUser,
  addSingleOrder,
  changeStatusOrder,
  getOrderById,
  orderPayment,
} = require("../controller/orderController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId/:meja", verifyUser("customer"), addOrder);
router.post("/add/single/:userId/:meja", addSingleOrder);
router.get("/get/:userId", getOrderUser);
router.get("/get/detail/:id", getOrderById);
router.post("/payment/:userId/:orderId", orderPayment);
router.post("/status/:userId/:orderId", changeStatusOrder);

module.exports = router;
