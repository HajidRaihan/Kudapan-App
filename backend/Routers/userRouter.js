const express = require("express");
const { loginAdmin, registerAdmin } = require("../controller/adminController");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  editUser,
  changeStatusUser,
  registerVendor,
  loginVendor,
  getVendorById,
  editVendor,
  getAllVendor,
  changeStatusVendor,
} = require("../controller/userController");
const upload = require("../middleware/multerMiddleware");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/admin/register", registerAdmin);
router.get("/get/:id", verifyUser("customer"), getUserById);
router.put("/edit/:id", verifyUser("customer"), upload.single("image"), editUser);

// Vendor route
router.get("/get/vendor/:id", verifyUser("vendor"), getVendorById);
router.post("/login/vendor", loginVendor);
router.put("/edit/vendor/:id", verifyUser("vendor"), upload.single("image"), editVendor);

// Admin Route
router.post("/login/admin", loginAdmin);
router.get("/get", verifyUser("admin"), getAllUser);
router.post("/vendor/register", verifyUser("admin"), registerVendor);
router.get("/getVendor", verifyUser("admin"), getAllVendor);
router.put("/status/:id", verifyUser("admin"), changeStatusUser);
router.put("/status/vendor/:id", verifyUser("admin"), changeStatusVendor);

module.exports = router;
