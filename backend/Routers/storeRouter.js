const express = require("express");
const router = express.Router();
const { getAllStore, addStore } = require("../Controller/storeController");
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/multerMiddleware");

router.get("/getAll", getAllStore);

router.post("/add", upload.single("image"), addStore);

module.exports = router;
