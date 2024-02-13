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
  order_history: [historySchema], // Order di-embed di dalam User
  keranjang: {
    type: keranjangSchema,
    default: null,
  },
  orders: [orderSchema], // ndk tau kenapa error passnya kukasi ini endpoint anjingg
});

module.exports = userSchema;
