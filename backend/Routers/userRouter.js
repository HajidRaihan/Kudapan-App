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
} = require("../controller/userController");
const upload = require("../middleware/multerMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/admin/register", registerAdmin);
router.get("/get", getAllUser);
router.get("/get/:id", getUserById);
router.put("/status/:id", changeStatusUser);
router.put("/edit/:id", upload.single("image"), editUser);

// Vendor route
router.get("/get/vendor/:id", getVendorById);
router.post("/login/vendor", loginVendor);
router.post("/vendor/register", registerVendor);
router.put("/edit/vendor/:id", upload.single("image"), editVendor);

// Admin Route
router.post("/login/admin", loginAdmin);

module.exports = router;
