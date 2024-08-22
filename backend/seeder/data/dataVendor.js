const bcrypt = require("bcrypt");
const dataToko = require("./dataToko");

const dataVendor = [
  ...Array.from({ length: 10 }).map((_, index) => ({
    nama: `Vendor ${index + 1}`,
    email: `vendor${index + 1}@example.com`,
    password: bcrypt.hashSync("password", 10),
    toko: dataToko[index]._id,
  })),
];

module.exports = dataVendor;
