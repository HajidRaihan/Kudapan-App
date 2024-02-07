const { Keranjang, Produk, User, Toko } = require("../models");

// const addProdukKeranjang = async (req, res) => {
//   try {
//     const { produkId, jumlah, catatan } = req.body;
//     const { userId } = req.params;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(401).json({ msg: "User not found" });
//     }

//     const produk = await Produk.findById(produkId);
//     if (!produk) {
//       return res.status(401).json({ msg: "Produk not found" });
//     }
//     const keranjang = user.keranjang;

//     console.log("ini nama produk", produk.nama);

//     const newProduk = {
//       nama: produk.nama,
//       harga: produk.harga,
//       image: produk.image,
//       jumlah: jumlah,
//       catatan: catatan,
//       total: produk.harga * jumlah,
//     };

//     // await newProduk.save();

//     console.log({ newProduk });

//     keranjang.produk.push(newProduk);

//     await keranjang.save();
//     await user.save();

//     return res.status(201).json({ message: "Keranjang ditambahkan", keranjang });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "keranjang gagal di tambahkan" });
//   }
// };

const addProdukKeranjang = async (req, res) => {
  const { tokoId, produkId, jumlah, catatan } = req.body;
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const toko = await Toko.findById(tokoId);
    console.log({ toko });
    if (!toko) {
      return res.status(401).json({ msg: "Toko not found" });
    }

    const produk = await Produk.findById(produkId);
    if (!produk) {
      return res.status(401).json({ msg: "Produk not found" });
    }

    const produkAda = toko.produk.some((item) => item._id.equals(produkId));

    if (!produkAda) {
      return res.status(401).json({ msg: "Produk tidak ada di toko tersebut" });
    }

    const produkBaru = {
      nama: produk.nama,
      harga: produk.harga,
      image: produk.image,
      jumlah: jumlah,
      catatan: catatan,
      total: produk.harga * jumlah,
    };

    const keranjang = user.keranjang;

    if (keranjang === null) {
      const newKeranjang = new Keranjang({ list: [] });
      await newKeranjang.save();
      user.keranjang = newKeranjang;
      await user.save();
    }
    const tokoAda = keranjang.list.some((item) => item.toko.equals(tokoId));

    if (tokoAda) {
      const tokoIndex = keranjang.list.findIndex((item) => item.toko.equals(tokoId));
      console.log(tokoAda.produk);
      keranjang.list[tokoIndex].produk.push(produkBaru);
      keranjang.list[tokoIndex].total_harga += produkBaru.total;
      await keranjang.save();
      await user.save();
      return res.status(201).json({
        message: `Keranjang di tambahkan di toko ${keranjang.list[tokoIndex].nama_toko}`,
        keranjang,
      });
    } else {
      keranjang.list.push({
        toko: toko._id,
        nama_toko: toko.nama,
        produk: [produkBaru],
        total_harga: produkBaru.total,
      });
      console.log({ keranjang });

      await keranjang.save();
      await user.save();

      console.log(keranjang);
      return res.status(201).json({ message: "Keranjang ditambahkan", keranjang });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "keranjang gagal di tambahkan", error: error });
  }
};

const getKeranjang = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const keranjang = user.keranjang;
    if (!keranjang) {
      return res.status(401).json({ msg: "Keranjang not found" });
    }
    return res.status(200).json(keranjang);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "keranjang gagal di tampilkan", error: error });
  }
};

module.exports = {
  addProdukKeranjang,
  getKeranjang,
};
