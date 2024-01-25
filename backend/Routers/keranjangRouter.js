const express = require("express");
const router = express.Router();
const { addProdukKeranjang } = require("../Controller/keranjangController");

router.post("/add", addProdukKeranjang);

module.exports = router;
