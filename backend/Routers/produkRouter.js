const express = require("express");
const router = express.Router();
const { addProduk, getProduk } = require("../Controller/produkController");
const upload = require("../middleware/multerMiddleware");

router.post("/add", upload.single("image"), addProduk);
router.get("/get/:tokoId", getProduk);

module.exports = router;
