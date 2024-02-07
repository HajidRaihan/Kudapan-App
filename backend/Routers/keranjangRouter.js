const express = require("express");
const router = express.Router();
const { addProdukKeranjang, getKeranjang } = require("../Controller/keranjangController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId", verifyUser("customer"), addProdukKeranjang);
router.get("/get/:userId", verifyUser("customer"), getKeranjang);

module.exports = router;
