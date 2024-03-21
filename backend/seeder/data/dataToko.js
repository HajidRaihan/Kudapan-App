const { default: mongoose } = require("mongoose");
const dataProduk = require("./dataProduk");

const dataToko = [
  {
    _id: new mongoose.Types.ObjectId(),
    nama: "Warung Sederhana",
    produk: dataProduk.dataProduk1.map((produk) => produk._id),
    deskripsi: "warung nasi padang",
    image: "1707486450080-mcd.jpg",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    nama: "Warung Tegal",
    produk: dataProduk.dataProduk2.map((produk) => produk._id),
    deskripsi: "warung nasi tegal",
    image: "1707486450080-mcd.jpg",
  },
];

module.exports = dataToko;
