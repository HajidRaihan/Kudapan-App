const mongoose = require("mongoose");
const produkSchema = require("./Produk");

const keranjangSchema = new mongoose.Schema({
  produk: [produkSchema], // Produk di-embed di dalam Keranjang
  jumlah: {
    type: Number,
    required: false,
  },
});

// const Keranjang = mongoose.model("Keranjang", keranjangSchema);

module.exports = keranjangSchema;
