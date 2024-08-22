const mongoose = require("mongoose");
const keranjangSchema = require("./Cart");

const vendorSchema = new mongoose.Schema(
  {
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
    toko: { type: mongoose.Schema.Types.ObjectId, ref: "Toko" },
    status: {
      type: String,
      enum: ["aktif", "nonaktif"],
      default: "aktif",
    },
    saldo: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = vendorSchema;
