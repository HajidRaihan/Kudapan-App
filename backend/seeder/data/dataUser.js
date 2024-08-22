// const bcrypt = require("bcrypt");
// const dataToko = require("./dataToko");

// const dataUser = [
//   {
//     nama: "Hajid Raihan",
//     email: "hajidraihan@gmail.com",
//     password: "$2a$10$LHEl2SqI0olMD3lUwGXsl.tHpMpJtYRFZyvOEw9ACyBdrpzjY7wPC",
//     role: "vendor",
//     toko: dataToko[0]._id,
//     order_history: [],
//     keranjang: [],
//     orders: [],
//   },
//   {
//     nama: "Emha Ismaulidin",
//     email: "fudhol@gmail.com",
//     password: "$2a$10$LHEl2SqI0olMD3lUwGXsl.tHpMpJtYRFZyvOEw9ACyBdrpzjY7wPC",
//     role: "vendor",
//     toko: dataToko[1]._id,
//     order_history: [],
//     keranjang: [],
//     orders: [],
//   },
//   {
//     nama: "Efendi Wiranata",
//     email: "fendi@gmail.com",
//     password: "$2a$10$LHEl2SqI0olMD3lUwGXsl.tHpMpJtYRFZyvOEw9ACyBdrpzjY7wPC",
//     role: "customer",
//     toko: null,
//     order_history: [],
//     keranjang: [],
//     orders: [],
//   },
// ];

// module.exports = dataUser;

// // const hashPassword = async (password) => {
// //   const hashedPassword = await bcrypt.hash(password, 10);
// //   return hashedPassword;
// // };

// // const populateDataUser = async () => {
// //   for (const user of dataUser) {
// //     user.password = await hashPassword(user.password);
// //   }
// // };

// // populateDataUser().then(() => {
// //   console.log("Data user telah diisi dengan hasil hash password");
// //   console.log("Data user:", JSON.stringify(dataUser, null, 2));

// //   // Ekspor data user sebagai modul
// //   module.exports = dataUser;
// // });

const bcrypt = require("bcrypt");
const dataToko = require("./dataToko");

const customerUser = {
  nama: "Hajid Raihan",
  email: "hajidraihan@gmail.com",
  password: bcrypt.hashSync("password", 10),
  keranjang: [],
};

// Menggabungkan pengguna pelanggan dengan data pengguna yang sudah ada
const dataUser = [
  customerUser, // Menambahkan pengguna pelanggan ke array data pengguna
];
module.exports = dataUser;
