const mongoose = require("mongoose");
const produkSchema = require("./Produk");
const pesananSchema = require("./Pesanan");

const keranjangSchema = new mongoose.Schema({
  produk: [pesananSchema],
  total_harga: {
    type: Number,
    required: false,
  },
});

// const Keranjang = mongoose.model("Keranjang", keranjangSchema);

module.exports = keranjangSchema;
