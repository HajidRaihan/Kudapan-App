const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrderUser,
  addSingleOrder,
  changeStatusOrder,
  getOrderById,
  orderPayment,
  paymentCashContoller,
  getOrderUserToday,
} = require("../controller/orderController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId/:meja", addOrder); // done
router.post("/add/single/:userId/:meja", addSingleOrder);
router.get("/get/:userId", getOrderUser); // done
router.get("/get/today/:userId", getOrderUserToday); // done
router.get("/get/detail/:id", getOrderById); // done
router.post("/payment/:userId/:orderId", orderPayment); // done
router.post("/status/:userId/:orderId", changeStatusOrder); // done
router.put("/payment/cash/:userId/:orderId", paymentCashContoller); // done

module.exports = router;
