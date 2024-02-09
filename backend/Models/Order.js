const mongoose = require("mongoose");
const pesananSchema = require("./Pesanan");

const orderSchema = new mongoose.Schema({
  pemesan: {
    type: String,
    required: true,
  },
  email_pemesan: {
    type: String,
    required: true,
  },
  pesanan: [pesananSchema],
  total_harga: {
    type: Number,
    required: true,
  },
  meja: {
    type: Number,
    required: true,
  },
  waktu_Pemesanan: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["diterima", "diproses", "Selesai"],
    default: "diterima",
  },
});

module.exports = orderSchema;
