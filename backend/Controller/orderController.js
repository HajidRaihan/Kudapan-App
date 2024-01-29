const { User, Order } = require("../models");

const addOrder = async (req, res) => {
  // const { userId, keranjangId } = req.body;
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const produkToMove = user.keranjang.produk;

    // Hitung total harga dari keseluruhan produk di keranjang
    const totalHarga = hitungTotalHarga(produkToMove);
    const newOrder = new Order({
      produk: produkToMove,
      total: totalHarga,
      status: "diproses",
    });

    user.orders.push(newOrder);

    // Hapus produk dari keranjang
    user.keranjang.produk = [];

    // Simpan perubahan ke MongoDB
    await user.save();

    return res.json({ message: "Order berhasil ditambahkan", data: newOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "gagal menambahkan order", error });
  }
};

const hitungTotalHarga = (produkArray) => {
  return produkArray.reduce((total, produk) => {
    return total + produk.total;
  }, 0);
};

module.exports = {
  addOrder,
};
