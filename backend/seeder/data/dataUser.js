const bcrypt = require("bcrypt");
const dataToko = require("./dataToko");

const dataUser = [
  {
    nama: "Hajid Raihan",
    email: "hajidraihan@gmail.com",
    password: "",
    role: "customer",
    toko: dataToko[0]._id,
    order_history: [],
    keranjang: [],
    orders: [],
  },
];

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const populateDataUser = async () => {
  for (const user of dataUser) {
    user.password = await hashPassword(user.password);
  }
};

populateDataUser().then(() => {
  console.log("Data user telah diisi dengan hasil hash password");
  console.log("Data user:", JSON.stringify(dataUser, null, 2));

  // Ekspor data user sebagai modul
  module.exports = dataUser;
});
