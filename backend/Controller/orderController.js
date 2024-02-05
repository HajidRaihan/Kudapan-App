const { User, Order } = require("../models");

const addOrder = async (req, res) => {
  // const { userId, keranjangId } = req.body;
  const { userId, meja } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const produkToMove = user.keranjang;

    // Hitung total harga dari keseluruhan produk di keranjang
    const totalHarga = hitungTotalHarga(produkToMove.list);
    const newOrder = new Order({
      pesanan: produkToMove,
      total: totalHarga,
      meja: meja,
      status: "diproses",
    });

    user.orders.push(newOrder);

    // Hapus produk dari keranjang
    user.keranjang.list = [];

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
    return total + produk.total_harga;
  }, 0);
};

const getOrderUser = async (req, res) => {
  const userId = req.params;

  try {
    const user = await User.findById(userId);

    if (userId) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = user.orders;

    return res.json(order);
  } catch (error) {
    console.log(erorr);
    return res.status(500).json({ error: "gagal menampilkan order", error });
  }
};

module.exports = {
  addOrder,
  getOrderUser,
};
