const mongoose = require("mongoose");
const produkSchema = require("./Produk");
const pesananSchema = require("./Pesanan");

const orderSchema = new mongoose.Schema({
  produk: [pesananSchema],
  total: {
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
