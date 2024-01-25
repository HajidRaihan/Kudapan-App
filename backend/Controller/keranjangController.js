const { Keranjang, User, Produk } = require("../Models");

const addProdukKeranjang = async (req, res) => {
  try {
    const { userId, produkId, keranjangId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const newProduk = await Produk.findById(produkId);
    if (!newProduk) {
      return res.status(401).json({ msg: "Produk not found" });
    }
    const keranjang = user.keranjang;

    keranjang.produk.push(newProduk);

    await keranjang.save();
    await user.save();

    return res.status(201).json({ message: "Keranjang ditambahkan", keranjang });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "keranjang gagal di tambahkan" });
  }
};

module.exports = {
  addProdukKeranjang,
};
