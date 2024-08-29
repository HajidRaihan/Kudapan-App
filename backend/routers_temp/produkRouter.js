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

router.get("/get/:tokoId", verifyUser(), getProduk);
router.get("/get/detail/:produkId", verifyUser("vendor"), getProdukById);

// Vendor route
router.delete("/delete/:userId/:produkId", verifyUser("vendor"), deleteProduk); // done
router.post("/add/:userId", verifyUser("vendor"), upload.single("image"), addProduk); //done
router.put("/edit/:userId/:produkId", verifyUser("vendor"), upload.single("image"), editProduk); // done

module.exports = router;
