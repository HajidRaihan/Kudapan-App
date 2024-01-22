const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  ketersediaan: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const storeSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  produk: [productSchema],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
