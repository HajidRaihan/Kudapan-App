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

router.post("/add/:userId", addProdukKeranjang); // done
router.get("/get/:userId", getKeranjang); // done
router.get("/get/jumlah/:userId", getJumlahKeranjang); // done
router.delete("/delete/:orderIndex/:produkIndex/:userId", deleteProdukKeranjang); // done
router.delete("/clear/:userId", clearKeranjang); // done
router.put("/increase/:orderIndex/:produkIndex/:userId", increaseProdukKeranjang); // done

module.exports = router;
