const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controller/adminController");
const upload = require("../middleware/multerMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/get", verifyUser("admin"), getAllUser);
router.get("/get/:id", verifyUser(), getUserById);
router.put("/edit/:id", verifyUser(), upload.single("image"), editUser);

module.exports = router;
