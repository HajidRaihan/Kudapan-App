const mongoose = require("mongoose");

const dataProduk1 = [
  {
    _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
    nama: "Bakso",
    harga: 15000,
    image: "https://example.com/bakso.jpg",
    type: "makanan",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nama: "Es Teh",
    harga: 5000,
    image: "https://example.com/es-teh.jpg",
    type: "minuman",
  },
];

const dataProduk2 = [
  {
    _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId
    nama: "Nasi Goreng",
    harga: 15000,
    image: "https://example.com/bakso.jpg",
    type: "makanan",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nama: "Es Teler",
    harga: 5000,
    image: "https://example.com/es-teh.jpg",
    type: "minuman",
  },
];

module.exports = { dataProduk1, dataProduk2 };
