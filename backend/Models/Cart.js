const mongoose = require("mongoose");
const produkSchema = require("./Produk");

const keranjangSchema = new mongoose.Schema({
  produk: [produkSchema], // Produk di-embed di dalam Keranjang
  jumlah: {
    type: Number,
    required: true,
  },
});

// const Keranjang = mongoose.model("Keranjang", keranjangSchema);

module.exports = keranjangSchema;
