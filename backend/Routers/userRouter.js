const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  editUser,
} = require("../controller/userController");
const upload = require("../middleware/multerMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/get", getAllUser);
router.get("/get/:id", getUserById);
router.put("/edit/:id", upload.single("image"), editUser);

module.exports = router;
