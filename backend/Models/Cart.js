const mongoose = require("mongoose");
const produkSchema = require("./Produk");
const pesananSchema = require("./Pesanan");

const keranjangSchema = new mongoose.Schema({
  toko: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  nama_toko: {
    type: String,
    required: true,
  },
  total_harga: {
    type: Number,
    require: true,
  },
  produk: [pesananSchema],

  // produk: [pesananSchema],
});

// const Keranjang = mongoose.model("Keranjang", keranjangSchema);

module.exports = keranjangSchema;
