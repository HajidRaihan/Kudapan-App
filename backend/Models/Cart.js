const mongoose = require("mongoose");
const produkSchema = require("./Produk");

const keranjangSchema = new mongoose.Schema({
  produk: [
    {
      nama: {
        type: String,
        // required: true,
      },
      harga: {
        type: Number,
        // required: true,
      },
      image: {
        type: String,
        // required: true,
      },
      jumlah: {
        type: Number,
        default: 1,
      },
      total: {
        type: Number,
        default: 0,
      },
    },
  ], // Produk di-embed di dalam Keranjang
  total_harga: {
    type: Number,
    required: false,
  },
});

// const Keranjang = mongoose.model("Keranjang", keranjangSchema);

module.exports = keranjangSchema;
