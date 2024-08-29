const express = require("express");
const router = express.Router();
const {
  addProdukKeranjang,
  getKeranjang,
  deleteProdukKeranjang,
  increaseProdukKeranjang,
  clearKeranjang,
  getJumlahKeranjang,
} = require("../controller/keranjangController");
const { verifyUser } = require("../middleware/verifyAccessToken");

router.post("/add/:userId", verifyUser("customer"), addProdukKeranjang); // done
router.get("/get/:userId", verifyUser("customer"), getKeranjang); // done
router.get("/get/jumlah/:userId", verifyUser("customer"), getJumlahKeranjang); // done
router.delete(
  "/delete/:orderIndex/:produkIndex/:userId",
  verifyUser("customer"),
  deleteProdukKeranjang
); // done
router.delete("/clear/:userId", verifyUser("customer"), clearKeranjang); // done
router.put(
  "/increase/:orderIndex/:produkIndex/:userId",
  verifyUser("customer"),
  increaseProdukKeranjang
); // done

module.exports = router;
