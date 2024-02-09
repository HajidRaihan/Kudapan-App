const mongoose = require("mongoose");
const produkSchema = require("./Produk");

const tokoSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  produk: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produk" }], // Produk di-embed di dalam Toko
});

module.exports = tokoSchema;
