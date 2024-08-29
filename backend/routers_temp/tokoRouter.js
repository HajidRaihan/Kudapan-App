const express = require("express");
const router = express.Router();
const {
  getAllStore,
  addStore,
  updateStore,
  getStoreById,
  changeTokoStatus,
} = require("../controller/storeController");
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/multerMiddleware");
const { getDetailTokoByUserId } = require("../controller/produkController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.get("/getAll", verifyUser("customer"), getAllStore); // done customer page
router.get("/get/:userId", verifyUser("vendor"), getStoreById);

router.post("/add/:userId", verifyUser("vendor"), upload.single("image"), addStore);
router.put("/update/:tokoId", verifyUser("vendor"), upload.single("image"), updateStore); // done
router.put("/status/:userId", verifyUser("vendor"), changeTokoStatus);

module.exports = router;
