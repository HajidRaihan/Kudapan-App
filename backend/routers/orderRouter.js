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
  getVendorIncome,
  getVendorIncomeToday,
} = require("../controller/orderController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId/:meja", verifyUser("customer"), addOrder); // done
router.post("/add/single/:userId/:meja", verifyUser("customer"), addSingleOrder);
router.get("/get/:userId", verifyUser("vendor"), getOrderUser); // done
router.get("/get/today/:userId", verifyUser("vendor"), getOrderUserToday); // done
router.get("/get/detail/:id", verifyUser(), getOrderById); // done
router.post("/payment/:userId/:orderId", verifyUser("customer"), orderPayment); // done
router.post("/status/:userId/:orderId", verifyUser("vendor"), changeStatusOrder); // done
router.put("/payment/cash/:userId/:orderId", verifyUser("vendor"), paymentCashContoller); // done
router.get("/get/income/:userId", getVendorIncome);
router.get("/get/income_today/:userId", getVendorIncomeToday);

module.exports = router;
