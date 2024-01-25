const { Toko, User } = require("../Models");

const getAllStore = async (req, res) => {
  const toko = await Toko.find();
  res.json(toko);
};

const addStore = async (req, res) => {
  const { userId, nama, deskripsi } = req.body;

  try {
    // Temukan pengguna berdasarkan ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan" });
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

module.exports = {
  getAllStore,
  addStore,
};
