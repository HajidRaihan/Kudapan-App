const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const generateLogToken = require("../utils");

const registerAdmin = async (req, res) => {
  const { nama, email, password } = req.body;
  try {
    let existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({
      nama: nama,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: "success add user",
      data: {
        nama: newUser.nama,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json("Internal server error");
    console.log(err);
  }
};

module.exports = {
  registerAdmin,
};
