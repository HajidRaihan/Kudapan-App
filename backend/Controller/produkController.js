const { Toko, Produk } = require("../Models");

const addProduk = async (req, res) => {
  const { tokoId, nama, harga } = req.body;
  //   const { tokoId } = req.params;
  console.log(tokoId);
  try {
    const toko = await Toko.findById(tokoId);
    console.log(toko.produk);

    if (!toko) {
      return res.status(404).json({ error: "toko tidak ditemukan" });
    }

    const newProduk = new Produk({
      nama: nama,
      harga: harga,
      image: req.file.filename,
    });

    await newProduk.save();

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

const getProduk = async (req, res) => {
  try {
    const { tokoId } = req.params;
    console.log(tokoId);
    const toko = await Toko.findById(tokoId);
    console.log(toko);

    if (!toko) {
      console.log("lahh kontol");
      return res.status(404).json({ error: "toko tidak ditemukan" });
    }

    const produk = toko.produk;

    res.status(200).json(produk);
  } catch (error) {
    console.error("Gagal mendapatkan produk:", error);
    return res.status(500).json({ error: "Gagal mendapatkan produk" });
  }
};

module.exports = { addProduk, getProduk };