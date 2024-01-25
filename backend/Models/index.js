const mongoose = require("mongoose");
const produkSchema = require("./Produk");
const keranjangSchema = require("./Cart");
const orderSchema = require("./Order");
const tokoSchema = require("./Store");
const userSchema = require("./User");

const Produk = mongoose.model("Produk", produkSchema);
const Toko = mongoose.model("Toko", tokoSchema);
const Keranjang = mongoose.model("Keranjang", keranjangSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Produk,
  Toko,
  Keranjang,
  Order,
  User,
};
