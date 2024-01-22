const express = require("express");
const router = express.Router();
// const User = require("../Models/User");
const { User, Toko } = require("../Models");
const bcrypt = require("bcrypt");
const generateLogToken = require("../utils");

// router.post("/register", async (req, res) => {
//   let user = await User.findOne({ email: req.body.email });
//   if (user) {
//     return res.send("email sudah ada!");
//   }
//   user = new User({
//     nama: req.body.nama,
//     email: req.body.email,
//     password: await bcrypt.hash(req.body.password, 10),
//     role: "penjual",
//   }).save();

//   res.json("user berhasil ditambahkan");
// });

router.post("/register", async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      nama: req.body.nama,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      toko: null,
      orders: [],
    });

    await newUser.save();
    res.status(201).json("User successfully added");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json("Internal server error");
  }
});

// router.post("/login", async (req, res) => {
//   const user = User.findOne({ email: req.body.email });
//   if (user) {
//     if (bcrypt.compare(req.body.password, user.password)) {
//       res.send({
//         _id: user._id,
//         nama: user.nama,
//         email: user.email,
//         password: user.password,
//         token: generateLogToken(user),
//       });
//     }
//   }
// });

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compare(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        nama: user.nama,
        email: user.email,
        password: user.password,
        token: generateLogToken(user),
      });
    }
  }
});
// router.post("/register", async (req, res) => {
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.send("User with given email is existing!");

//   user = new User({
//     fullname: req.body.fullname,
//     email: req.body.email,
//     password: await bcrypt.hash(req.body.password, 10),
//   }).save();
//   res.send(user);
// });

module.exports = router;
