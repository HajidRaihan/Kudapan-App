const mongoose = require("mongoose");
const tokoSchema = require("./Store");
const historySchema = require("./History");
const keranjangSchema = require("./Cart");
const orderSchema = require("./Order");

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
  toko: { type: mongoose.Schema.Types.ObjectId, ref: "Toko" },
  order_history: [historySchema],
  keranjang: [keranjangSchema],
  orders: [orderSchema],
  saldo: {
    type: Number,
    default: 0,
  },
});

module.exports = userSchema;
