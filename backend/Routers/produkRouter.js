const express = require("express");
const router = express.Router();
const {
  addProduk,
  getProduk,
  getProdukById,
  deleteProduk,
  editProduk,
} = require("../controller/produkController");
const upload = require("../middleware/multerMiddleware");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.get("/get/:tokoId", getProduk);
router.get("/get/detail/:produkId", getProdukById);

// Vendor route
router.delete("/delete/:userId/:produkId", deleteProduk); // done
router.post("/add/:userId", upload.single("image"), addProduk); //done
router.put("/edit/:userId/:produkId", upload.single("image"), editProduk); // done

module.exports = router;
