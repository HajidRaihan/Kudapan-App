const { User, History, Toko, Order, Produk } = require("../models");

const addOrder = async (req, res) => {
  const { userId, meja } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let listOrder = [];

    for (const [index, item] of user.keranjang.entries()) {
      const tokoId = item.toko;
      try {
        const vendor = await User.findOne({ toko: tokoId });
        if (!vendor) {
          return res.status(404).json({ error: "Vendor not found" });
        }

        newOrder = new Order({
          pemesan: userId,
          toko_id: tokoId,
          pesanan: user.keranjang[index].produk,
          total_harga: user.keranjang[index].total_harga,
          meja: meja,
        });

        newOrder.save();
        // vendor.orders.push(newOrder);
        vendor.saldo += user.keranjang[index].total_harga;

        listOrder.push({ tokoId: tokoId, order: newOrder });

        await vendor.save();

        console.log(newOrder);
        // return res.json({ message: "orderan berhasil ditambahkan", data: newOrder });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // return;
    const produkToMove = user.keranjang;

    // Hitung total harga dari keseluruhan produk di keranjang
    const totalHarga = hitungTotalHarga(produkToMove);
    // const newHistory = new History({
    //   pesanan: produkToMove,
    //   total: totalHarga,
    //   meja: meja,
    //   status: "diproses",
    // });

    const saldo = user.saldo;

    if (saldo < totalHarga) {
      return res.status(400).json({ error: "Saldo tidak mencukupi" });
    }

    user.saldo = user.saldo - totalHarga;

    // user.order_history.push(newHistory);

    // Hapus produk dari keranjang
    user.keranjang = [];

    // Simpan perubahan ke MongoDB
    await user.save();

    return res.json({ message: "order berhasil ditambahkan", data: listOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "gagal menambahkan order", error });
  }
};

const addSingleOrder = async (req, res) => {
  const { userId, meja } = req.params;
  const { tokoId, produkId, jumlah, catatan } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const toko = await Toko.findById(tokoId);

    if (!toko) {
      return res.status(404).json({ error: "Toko not found" });
    }

    const produk = await Produk.findById(produkId);

    if (!produk) {
      return res.status(404).json({ error: "Produk not found" });
    }

    const produkAda = toko.produk.some((item) => item._id.equals(produkId));
    if (!produkAda) {
      return res.status(401).json({ msg: "Produk tidak ada di toko tersebut" });
    }

    const vendor = await User.findOne({ toko: tokoId });
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    const newOrder = new Order({
      pemesan: userId,
      pesanan: {
        nama: produk.nama,
        harga: produk.harga,
        image: produk.image,
        jumlah: jumlah,
        catatan: catatan,
        total: produk.harga * jumlah,
      },
      total_harga: produk.harga * jumlah,
      meja: meja,
    });

    vendor.orders.push(newOrder);
    await vendor.save();
    console.log({ vendor });
    // user.orders.push(newOrder);
    // await user.save();
    console.log(newOrder);
    return res.json({ message: "orderan berhasil ditambahkan", data: newOrder });
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

// const getOrderUser = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);

//     if (!userId) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const order = user.orders;

//     return res.json(order);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "gagal menampilkan order", error });
//   }
// };

// const getOrderUser = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const order = await Order.find({ toko_id: user.toko });

//     const userPemesan = await User.findById(order.pemesan);
//     console.log({ userPemesan });

//     console.log(order);
//     return res.status(200).json({ message: "order berhasil ditdapatkan", data: order });
//   } catch (err) {
//     return res.status(500).json({ error: "gagal menampilkan order", error: err });
//   }
// };

const getOrderUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orders = await Order.find({ toko_id: user.toko });

    // Array to hold orders with userPemesan
    const ordersWithUserPemesan = [];

    for (const order of orders) {
      const user_pemesan = await User.findById(order.pemesan);
      ordersWithUserPemesan.push({ ...order.toObject(), user_pemesan });
    }

    // console.log(ordersWithUserPemesan);
    return res
      .status(200)
      .json({ message: "Order berhasil didapatkan", data: ordersWithUserPemesan });
  } catch (err) {
    return res.status(500).json({ error: "Gagal menampilkan order", error: err });
  }
};

// const changeStatusOrder = async (req, res) => {
//   const { userId, orderId } = req.params;
//   const { status } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const index = user.orders.findIndex((order) => order._id.toString() === orderId);

//     if (index === -1) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     const order = user.orders[index];

//     console.log(order);

//     order.status = status;

//     const pemesan = await User.find({ email: order.email_pemesan });

//     await user.save();

//     return res.json({ message: "Status order updated successfully", data: user.orders[index] });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Failed to update order status", error });
//   }
// };

const changeStatusOrder = async (req, res) => {
  const { userId, orderId } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = await Order.findById(orderId);

    // return console.log(order);

    order.status = status;

    await order.save();

    return res.json({ message: "Status order updated successfully", data: order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to update order status", error });
  }
};

const payment = async (req, res) => {
  const { userId, orderId } = req.params;
};

module.exports = {
  addOrder,
  getOrderUser,
  addSingleOrder,
  changeStatusOrder,
};
