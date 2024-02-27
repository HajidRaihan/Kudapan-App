const express = require("express");
const router = express.Router();
const {
  getAllStore,
  addStore,
  updateStore,
  getStoreById,
} = require("../Controller/storeController");
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/multerMiddleware");
const { getDetailTokoByUserId } = require("../Controller/produkController");

router.get("/getAll", getAllStore);
router.get("/get/:userId", getStoreById);

router.post("/add/:userId", upload.single("image"), addStore);
router.put("/update/:tokoId", upload.single("image"), updateStore);

module.exports = router;
