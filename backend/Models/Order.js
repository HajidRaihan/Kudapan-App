const mongoose = require("mongoose");
const produkSchema = require("./Produk");
const pesananSchema = require("./Pesanan");
const keranjangSchema = require("./Cart");

const orderSchema = new mongoose.Schema({
  pesanan: [keranjangSchema],
  total: {
    type: Number,
    required: true,
  },
  meja: {
    type: Number,
    required: true,
  },
  waktuPemesanan: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["diproses", "Selesai"],
    default: "diproses",
  },
});

module.exports = orderSchema;
