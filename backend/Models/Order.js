const mongoose = require("mongoose");
const keranjangSchema = require("./Cart");

const orderSchema = new mongoose.Schema({
  keranjang: keranjangSchema, // Keranjang di-embed di dalam Order
  total: {
    type: Number,
    required: true,
  },
  waktuPemesanan: {
    type: Date,
    default: Date.now,
  },
});

module.exports = orderSchema;
