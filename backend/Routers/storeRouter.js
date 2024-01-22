const express = require("express");
const router = express.Router();
const { getAllStore, addStore } = require("../Controller/storeController");
const { Toko, User } = require("../Models");
const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: diskStorage });

router.get("/getAll", getAllStore);

router.post("/add", upload.single("image"), addStore);

module.exports = router;
