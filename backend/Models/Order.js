const mongoose = require("mongoose");
const produkSchema = require("./Produk");

const orderSchema = new mongoose.Schema({
  produk: [produkSchema],
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
