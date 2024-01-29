const { Toko, User } = require("../models");

const getAllStore = async (req, res) => {
  try {
    const toko = await Toko.find();
    res.json(toko);
  } catch (error) {
    console.error("Gagal mendapatkan toko:", error);
    res.status(500).json({ error: "Gagal mendapatkan toko" });
  }
};

const addStore = async (req, res) => {
  const { nama, deskripsi } = req.body;
  const { userId } = req.params;

  try {
    // Temukan pengguna berdasarkan ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan", id: userId });
    }

    // Buat toko baru
    const newToko = new Toko({
      nama: nama,
      deskripsi: deskripsi,
      image: req.file.filename,
      produk: [],
    });

    // Simpan toko ke dalam database
    await newToko.save();

    // Tambahkan referensi toko ke pengguna
    user.toko = newToko;

    // Simpan perubahan pada pengguna
    await user.save();

    return res.status(201).json({ message: "Toko berhasil ditambahkan", toko: newToko });
  } catch (error) {
    console.error("Gagal menambahkan toko:", error);
    return res.status(500).json({ error: "Gagal menambahkan toko" });
  }
};

const getStoreById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user || !user.toko) {
      return res.status(404).json({ error: "User atau toko tidak ditemukan" });
    }
    return res.json({ toko: user.toko });
  } catch (error) {
    console.log("Error getting store data : ", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

// const updateStore = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     let { nama, deskripsi, image } = req.body;

//     // Cari user berdasarkan id yang diberikan
//     const user = await User.findById(userId);

//     // Jika user tidak ditemukan, kembalikan respon 404
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Jika ada gambar baru yang akan diupload, hapus gambar lama dan simpan gambar baru
//     if (image !== undefined) {
//       // Hapus gambar lama jika ada
//       if (user.toko && user.toko.image) {
//         await cloudinary.v2.uploader.destroy(user.toko.image);
//       }
//       // Upload gambar baru ke Cloudinary dan simpan hasilnya ke field `image` pada document user
//       image = await uploadImageToCloudinary(image);
//     } else {
//       // Jika tidak ada gambar baru, gunakan gambar lama
//       user.toko.image = image;
//     }
//     // Update informasi tentang toko
//     user.toko.nama = nama;
//     user.toko.deskripsi = deskripsi;

//     // Simpan perubahan ke database
//     user = await user.save();

//     // Kembalikan response dengan data user yang telah disimpankan
//     return res.json({ toko: user.toko });
//   } catch (err) {
//     console.error("Error updating store data", err);
//     return res.status(500).json({ error: "Server Error" });
//   }
// };

const updateStore = async (req, res) => {
  const { tokoId } = req.params;
  const { nama, deskripsi, image } = req.body;
  try {
    const existingStore = await Toko.findById(tokoId);
    if (!existingStore) {
      return res.status(404).json({ error: "Toko tidak ditemukan" });
    }
    existingStore.nama = nama;
    existingStore.deskripsi = deskripsi;
    existingStore.image = req.file.filename;
    console.log(req.file.filename);

    // await existingStore.save();
    return res.json({ toko: existingStore });
  } catch (error) {
    console.error("Gagal memperbarui toko:", error);
    return res.status(500).json({ error: "Gagal memperbarui toko" });
  }
};

module.exports = {
  getAllStore,
  addStore,
  updateStore,
};
