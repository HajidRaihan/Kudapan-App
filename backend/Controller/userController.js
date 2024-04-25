const { User } = require("../models");
const bcrypt = require("bcrypt");
const generateLogToken = require("../utils");

const registerUser = async (req, res) => {
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
      // toko: null,
      order_history: [],
      toko: null,
      orders: [],
    });

    await newUser.save();
    res.status(201).json({
      status: "success add user",
      data: {
        nama: newUser.nama,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json("Internal server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compare(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          nama: user.nama,
          email: user.email,
          password: user.password,
          role: user.role,
          token: generateLogToken(user),
        });
      }
    } else {
      res.status(404).json("Pengguna tidak ditemukan");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json("Internal server error");
  }
};

const getAllUser = async (req, res) => {
  const user = await User.find();

  try {
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { nama, email } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json("User not found");
  }

  try {
    const updateUser = {
      nama: nama,
      email: email,
      image: req.file ? req.file.filename : user.image,
    };

    await User.findByIdAndUpdate(id, updateUser);
    user.save();
    return res.status(200).json({ message: "success update user", data: updateUser });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  editUser,
};
