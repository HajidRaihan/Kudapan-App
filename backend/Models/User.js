const mongoose = require("mongoose");
const tokoSchema = require("./Store");
const orderSchema = require("./Order");
const keranjangSchema = require("./Cart");

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "vendor", "customer"],
    default: "customer",
  }, // Menambah atribut role
  toko: {
    type: tokoSchema,
    default: null,
  }, // Menyimpan informasi toko untuk vendor
  order_history: [orderSchema], // Order di-embed di dalam User
  keranjang: {
    type: keranjangSchema,
    default: null,
  },
  orders: {
    type: [orderSchema],
  },
});

module.exports = userSchema;
