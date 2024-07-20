const mongoose = require("mongoose");
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
  image: {
    type: String,
    default: null,
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
  keranjang: [keranjangSchema],
  saldo: {
    type: Number,
    default: 0,
  },
});

module.exports = userSchema;
