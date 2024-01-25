const mongoose = require("mongoose");

const { Produk, Toko, Keranjang, Order, User } = require("./Models");

mongoose.connect("mongodb://127.0.0.1:27017/kudapan");

// const data = {
//   produk: [
//     { nama: "Nasi Goreng", harga: 15000 },
//     { nama: "Mie Goreng", harga: 12000 },
//   ],
//   toko: [{ nama: "Warung Sederhana", produk: [] }],
//   keranjang: [{ produk: [], jumlah: 2 }],
//   order: [{ keranjang: null, total: 0 }],
//   user: [
//     {
//       nama: "John Doe",
//       email: "john.doe@example.com",
//       password: "password123",
//       role: "vendor",
//       toko: null,
//       orders: [],
//     },
//     {
//       nama: "hajid raihan",
//       email: "hajid.doe@example.com",
//       password: "password123",
//       role: "vendor",
//       toko: null,
//       orders: [],
//     },
//   ],
// };

const data = {
  produk: [
    {
      nama: "Nasi Goreng",
      harga: 15000,
      image: "1705938764785-551ce6e0bfb794864672981f75fa8ba5.jpg",
    },
    {
      nama: "Mie Goreng",
      harga: 12000,
      image: "1705938764785-551ce6e0bfb794864672981f75fa8ba5.jpg",
    },
  ],
  toko: [
    {
      nama: "Warung Sederhana",
      produk: [],
      image: "1705938764785-551ce6e0bfb794864672981f75fa8ba5.jpg",
      deskripsi: "toko yang menjual makanan",
    },
  ],
  keranjang: [{ produk: [], jumlah: 2 }],
  order: [{ keranjang: null, total: 27000 }],
  user: [
    {
      nama: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      role: "vendor",
      toko: null,
      orders: [],
    },
    {
      nama: "hajid raihan",
      email: "hajid.doe@example.com",
      password: "password123",
      role: "vendor",
      toko: null,
      orders: [],
    },
    {
      nama: "Susi Sari",
      email: "susi.sari@example.com",
      password: "password123",
      role: "user",
      toko: null,
      orders: [],
    },
  ],
};

async function seedDatabase() {
  try {
    // Bersihkan koleksi toko sebelum menyemai data
    // await Store.deleteMany();

    // // Seed data ke basis data
    // await Store.insertMany(seedData);

    await Promise.all([
      Produk.deleteMany(),
      Toko.deleteMany(),
      Keranjang.deleteMany(),
      Order.deleteMany(),
      User.deleteMany(),
    ]);

    const [produk1, produk2] = await Produk.create(data.produk);
    const toko = await Toko.create({ ...data.toko[0], produk: [produk1, produk2] });
    const keranjang = await Keranjang.create({ ...data.keranjang[0], produk: [produk1, produk2] });
    const order = await Order.create({ ...data.order[0], keranjang });
    const user = await User.create({ ...data.user[0], toko, orders: [order] });

    console.log("Seeder: Data berhasil di-seed");
  } catch (error) {
    console.error("Seeder: Gagal menyemai data", error);
  } finally {
    // Tutup koneksi setelah selesai
    mongoose.connection.close();
  }
}

seedDatabase();
