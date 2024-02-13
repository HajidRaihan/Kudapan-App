const { query } = require("express");
const { Toko, Produk, User } = require("../models");

// const addProduk = async (req, res) => {
//   const { nama, harga } = req.body;
//   const { tokoId, userId } = req.params;
//   console.log(tokoId);
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "user tidak ditemukan" });
//     }
//     const toko = await Toko.findById(tokoId);
//     console.log(toko.produk);

//     if (!toko) {
//       return res.status(404).json({ error: "toko tidak ditemukan" });
//     }

//     const newProduk = new Produk({
//       nama: nama,
//       harga: harga,
//       image: req.file.filename,
//     });

//     await newProduk.save();

//     toko.produk.push(newProduk);
//     user.toko.produk.push(newProduk);

//     await toko.save();
//     await user.save();
//     return res
//       .status(201)
//       .json({ message: `produk berhasil ditambahkan di toko ${toko.nama}`, produk: newProduk });
//   } catch (error) {
//     console.error("Gagal menambahkan produk:", error);
//     return res.status(500).json({ error: "Gagal menambahkan produk" });
//   }
// };

const addProduk = async (req, res) => {
  const { nama, harga, type } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "user tidak ditemukan" });
    }

    // Pastikan user memiliki toko
    if (!user.toko) {
      return res.status(404).json({ error: "user tidak memiliki toko" });
    }

    const newProduk = new Produk({
      nama: nama,
      harga: harga,
      image: req.file.filename,
      type: type,
    });

    await newProduk.save();

    // Simpan produk di toko milik user
    const toko = await Toko.findById(user.toko);
    if (!toko) {
      return res.status(404).json({ error: "toko tidak ditemukan" });
    }

    toko.produk.push(newProduk);
    await toko.save();

    return res
      .status(201)
      .json({ message: `produk berhasil ditambahkan di toko ${toko.nama}`, produk: newProduk });
  } catch (error) {
    console.error("Gagal menambahkan produk:", error);
    return res.status(500).json({ error: "Gagal menambahkan produk" });
  }
};

// const getProduk = async (req, res) => {
//   const { tokoId } = req.params;
//   try {
//     console.log(tokoId);
//     const toko = await Toko.findById(tokoId);
//     console.log(toko);

//     if (!toko) {
//       return res.status(404).json({ error: "toko tidak ditemukan" });
//     }

//     const produk = toko;

//     res.status(200).json(produk);
//   } catch (error) {
//     console.error("Gagal mendapatkan produk:", error);
//     return res.status(500).json({ error: "Gagal mendapatkan produk" });
//   }
// };

const getProduk = async (req, res) => {
  const { tokoId } = req.params;
  const { type } = req.query;

  try {
    // Temukan toko berdasarkan ID
    let query;
    if (type) {
      query = { type: type };
    }

    const toko = await Toko.findById(tokoId).populate({
      path: "produk",
      match: query,
    });
    console.log({ toko });

    if (!toko) {
      return res.status(404).json({ error: "Toko tidak ditemukan" });
    }

    // Ambil daftar produk dari toko
    const produk = toko.produk;

    res.status(200).json({ toko: toko.nama, produk });
  } catch (error) {
    console.error("Gagal mendapatkan produk:", error);
    return res.status(500).json({ error: "Gagal mendapatkan produk" });
  }
};

const getProdukById = async (req, res) => {
  const { produkId } = req.params;
  try {
    const produk = await Produk.findById(produkId);

    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }
    res.status(200).json(produk);
  } catch (error) {
    console.error("Gagal mendapatkan produk:", error);
    return res.status(500).json({ error: "Gagal mendapatkan produk" });
  }
};

module.exports = { addProduk, getProduk, getProdukById };
