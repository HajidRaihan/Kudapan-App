const { User, History, Toko, Order } = require("../models");

const addOrder = async (req, res) => {
  const { userId, meja } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    for (const [index, item] of user.keranjang.list.entries()) {
      const tokoId = item.toko;
      try {
        const vendor = await User.findOne({ toko: tokoId });
        if (!vendor) {
          continue;
        }

        const newOrder = new Order({
          pemesan: user.nama,
          email_pemesan: user.email,
          pesanan: user.keranjang.list[index].produk,
          total_harga: user.keranjang.list[index].total_harga,
          meja: meja,
        });
        vendor.orders.push(newOrder);
        await vendor.save();
        console.log(newOrder);
        return res.json({ message: "orderan berhasil ditambahkan", data: newOrder });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // return;
    const produkToMove = user.keranjang;

    // Hitung total harga dari keseluruhan produk di keranjang
    const totalHarga = hitungTotalHarga(produkToMove.list);
    const newHistory = new History({
      pesanan: produkToMove,
      total: totalHarga,
      meja: meja,
      status: "diproses",
    });

    user.order_history.push(newHistory);

    // Hapus produk dari keranjang
    user.keranjang.list = [];

    // Simpan perubahan ke MongoDB
    await user.save();

    return res.json({ message: "History berhasil ditambahkan", data: newHistory });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "gagal menambahkan order", error });
  }
};

// const addOrder = async (req, res) => {
//   // const { userId, keranjangId } = req.body;
//   const { userId, meja } = req.params;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const keranjangLength = user.keranjang.list.length;
//     for (let i = 0; i < keranjangLength; i++) {
//       // Mendapatkan ID toko dari index saat ini
//       const tokoId = user.keranjang.list[i].toko;

//       try {
//         // Mencari toko berdasarkan ID
//         const vendor = await User.findOne({ toko: tokoId });
//         if (!vendor) {
//           // Jika vendor tidak ditemukan, lanjutkan ke index berikutnya
//           continue;
//         }
//         console.log(user.nama);

//         const newOrder = new Order({
//           pemesan: user.nama,
//           email_pemesan: user.email,
//           pesanan: vendor.keranjang,
//           total_harga: 10,
//           meja: meja,
//         });
//         vendor.orders.push(newOrder);

//         // Lakukan sesuatu dengan vendor yang ditemukan
//         console.log(newOrder);

//         // await vendor.save();
//         // Anda dapat menambahkan logika lain di sini

//         // Jika Anda hanya ingin mencari satu vendor, Anda dapat keluar dari loop
//         // break;
//       } catch (error) {
//         console.error("Error:", error);
//         // Anda dapat menambahkan penanganan kesalahan sesuai kebutuhan
//       }
//     }
//     return;

//     const produkToMove = user.keranjang;

//     // Hitung total harga dari keseluruhan produk di keranjang
//     const totalHarga = hitungTotalHarga(produkToMove.list);
//     const newHistory = new History({
//       pesanan: produkToMove,
//       total: totalHarga,
//       meja: meja,
//       status: "diproses",
//     });

//     user.order_history.push(newHistory);

//     // Hapus produk dari keranjang
//     user.keranjang.list = [];

//     // Simpan perubahan ke MongoDB
//     await user.save();

//     return res.json({ message: "History berhasil ditambahkan", data: newOrder });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "gagal menambahkan order", error });
//   }
// };

const hitungTotalHarga = (produkArray) => {
  return produkArray.reduce((total, produk) => {
    return total + produk.total_harga;
  }, 0);
};

const getOrderUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const user = await User.findById(userId);

    console.log(user);

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = user.orders;

    return res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "gagal menampilkan order", error });
  }
};

module.exports = {
  addOrder,
  getOrderUser,
};
