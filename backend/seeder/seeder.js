const dotenv = require("dotenv");
const { Produk, Toko, User } = require("../models");
const dataProduk = require("./data/dataProduk");
const dataToko = require("./data/dataToko");
const dataUser = require("./data/dataUser");

dotenv.config();
require("../db/mongoose");

const seedDatabase = async () => {
  try {
    // await Produk.deleteMany();
    // await Toko.deleteMany();
    await Promise.all([Toko.deleteMany(), Produk.deleteMany(), User.deleteMany()]);

    await Promise.all([
      Toko.insertMany(dataToko),
      Produk.insertMany([...dataProduk.dataProduk1, ...dataProduk.dataProduk2]),
      User.insertMany(dataUser),
    ]);

    // await Produk.insertMany(dataProduk);
    // await Toko.insertMany(dataToko);

    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const deleteDatabase = async () => {
  try {
    await Produk.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.log(error);
    process.exit(1);
  }
};

// seedData();
// deleteProducts();

switch (process.argv[2]) {
  case "-d": {
    deleteDatabase();
    break;
  }
  default: {
    seedDatabase();
  }
}
