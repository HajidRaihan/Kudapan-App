const dataProduk = require("./dataProduk");

const dataToko = [
  {
    nama: "Warung Sederhana",
    produk: dataProduk.map((produk) => produk._id),
    deskripsi: "warung nasi padang",
    image: "1707486450080-mcd.jpg",
  },
];

module.exports = dataToko;
