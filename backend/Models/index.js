const mongoose = require("mongoose");

// Schema untuk Produk
const produkSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
});

// Schema untuk Toko
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
  produk: [produkSchema], // Produk di-embed di dalam Toko
});

// Schema untuk Keranjang
const keranjangSchema = new mongoose.Schema({
  produk: [produkSchema], // Produk di-embed di dalam Keranjang
  jumlah: {
    type: Number,
    required: true,
  },
});

// Schema untuk Order
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

// Schema untuk User
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
    default: "vendor",
  }, // Menambah atribut role
  toko: {
    type: tokoSchema,
    default: null,
  }, // Menyimpan informasi toko untuk vendor
  orders: [orderSchema], // Order di-embed di dalam User
});

// Buat model untuk setiap schema
const Produk = mongoose.model("Produk", produkSchema);
const Toko = mongoose.model("Toko", tokoSchema);
const Keranjang = mongoose.model("Keranjang", keranjangSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);

// Export model untuk digunakan di aplikasi Express.js
module.exports = {
  Produk,
  Toko,
  Keranjang,
  Order,
  User,
};
