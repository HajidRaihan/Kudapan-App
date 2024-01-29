const express = require("express");
const router = express.Router();
const { getAllStore, addStore, updateStore } = require("../Controller/storeController");
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/multerMiddleware");

router.get("/getAll", getAllStore);

router.post("/add/:userId", upload.single("image"), addStore);
router.put("/update/:tokoId", upload.single("image"), updateStore);

module.exports = router;
