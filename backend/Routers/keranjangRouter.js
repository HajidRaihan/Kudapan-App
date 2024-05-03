const express = require("express");
const router = express.Router();
const {
  addProdukKeranjang,
  getKeranjang,
  deleteProdukKeranjang,
  increaseProdukKeranjang,
  clearKeranjang,
} = require("../Controller/keranjangController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId", verifyUser("customer"), addProdukKeranjang);
router.get("/get/:userId", verifyUser("customer"), getKeranjang);
router.delete(
  "/delete/:orderIndex/:produkIndex/:userId",
  verifyUser("customer"),
  deleteProdukKeranjang
);
router.delete("/clear/:userId", verifyUser("customer"), clearKeranjang);
router.put(
  "/increase/:orderIndex/:produkIndex/:userId",
  verifyUser("customer"),
  increaseProdukKeranjang
);

module.exports = router;
