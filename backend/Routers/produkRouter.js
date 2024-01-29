const express = require("express");
const router = express.Router();
const { addProduk, getProduk, getProdukById } = require("../Controller/produkController");
const upload = require("../middleware/multerMiddleware");

router.post("/add/:tokoId", upload.single("image"), addProduk);
router.get("/get/:tokoId", getProduk);
router.get("/get/detail/:produkId", getProdukById);

module.exports = router;
