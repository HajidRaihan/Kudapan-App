const express = require("express");
const router = express.Router();
const { addProduk, getProduk, getProdukById } = require("../Controller/produkController");
const upload = require("../middleware/multerMiddleware");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId", upload.single("image"), addProduk);
router.get("/get/:tokoId", getProduk);
router.get("/get/detail/:produkId", verifyUser("customer"), getProdukById);

module.exports = router;
