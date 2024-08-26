const { User, Admin, Vendor } = require("../models");
const bcrypt = require("bcrypt");
const generateLogToken = require("../utils");

const registerUser = async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Email sudah digunakan");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      nama: req.body.nama,
      email: req.body.email,
      password: hashedPassword,
      keranjang: [],
    });

    await newUser.save();
    res.status(201).json({
      status: "success add user",
      data: {
        nama: newUser.nama,
        email: newUser.email,
        role: "customer",
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
};

const registerVendor = async (req, res) => {
  try {
    let vendor = await Vendor.findOne({ email: req.body.email });
    if (vendor) {
      return res.status(400).send("Email sudah digunakan");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new Vendor({
      nama: req.body.nama,
      email: req.body.email,
      password: hashedPassword,
      toko: null,
    });

    await newUser.save();
    res.status(201).json({
      status: "success add user",
      data: {
        nama: newUser.nama,
        email: newUser.email,
        role: "vendor",
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("Pengguna tidak ditemukan");
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Password salah");
    }

    return res.status(200).json({
      _id: user._id,
      nama: user.nama,
      email: user.email,
      role: "customer",
      token: generateLogToken(user),
    });
  } catch (error) {
    res.status(500).json("Internal server error");
    console.error("Error logging in user:", error);
  }
};

const loginVendor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(404).send("Pengguna tidak ditemukan");
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);

    if (!isPasswordValid) {
      return res.status(401).send("Password salah");
    }

    return res.status(200).json({
      _id: vendor._id,
      nama: vendor.nama,
      email: vendor.email,
      toko: vendor.toko,
      role: "vendor",
      token: generateLogToken(vendor),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).send("Pengguna tidak ditemukan");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).send("Password salah");
    }

    return res.status(200).json({
      _id: admin._id,
      nama: admin.nama,
      email: admin.email,
      role: "admin",
      token: generateLogToken(admin),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // return console.log(email, password);

//     // Cek pengguna di koleksi User
//     let user = await User.findOne({ email });
//     let isPasswordValid = false;

//     if (user) {
//       // Cek status pengguna
//       if (user.status === "nonaktif") {
//         return res.status(403).send("Akun Anda nonaktif. Silakan hubungi administrator.");
//       }
//       isPasswordValid = await bcrypt.compare(password, user.password);
//     }

//     if (!user || !isPasswordValid) {
//       // Jika pengguna tidak ditemukan atau password salah, cek di koleksi Admin
//       const admin = await Admin.findOne({ email });
//       if (admin) {
//         // Cek status admin (opsional, tergantung kebijakan aplikasi apakah admin bisa dinonaktifkan)
//         if (admin.status === "nonaktif") {
//           return res.status(403).send("Akun admin nonaktif. Silakan hubungi administrator.");
//         }
//         isPasswordValid = await bcrypt.compare(password, admin.password);
//         if (isPasswordValid) {
//           user = admin; // Menggunakan variabel user untuk menyimpan data admin
//           user.role = "admin"; // Tentukan role sebagai admin
//         }
//       }
//     }

//     // Jika pengguna dan admin tidak ditemukan atau password salah
//     if (!user || !isPasswordValid) {
//       return res.status(404).send("Pengguna tidak ditemukan atau password salah");
//     }

//     // Lakukan sesuatu setelah pengguna berhasil login, seperti membuat token JWT
//     // ...

//     // console.log(
//     //   res.json({
//     //     _id: user._id,
//     //     nama: user.nama,
//     //     email: user.email,
//     //     role: user.role,
//     //     token: generateLogToken(user),
//     //   })
//     // );

//     res.json({
//       _id: user._id,
//       nama: user.nama,
//       email: user.email,
//       role: user.role,
//       token: generateLogToken(user),
//     });
//   } catch (error) {
//     console.error("Error login:", error);
//     res.status(500).send("Terjadi kesalahan pada server.");
//   }
// };

const getAllUser = async (req, res) => {
  const user = await User.find();

  try {
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getAllVendor = async (req, res) => {
  const vendor = await Vendor.find();

  try {
    return res.status(200).json(vendor);
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

const getVendorById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Vendor.findById(id);
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

const editVendor = async (req, res) => {
  const { id } = req.params;
  const { nama, email } = req.body;

  const user = await Vendor.findById(id);

  if (!user) {
    return res.status(400).json("User not found");
  }

  try {
    const updateUser = {
      nama: nama,
      email: email,
    };

    await Vendor.findByIdAndUpdate(id, updateUser);
    user.save();
    return res.status(200).json({ message: "success update user", data: updateUser });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const changeStatusUser = async (req, res) => {
  const { status } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json("User not found");
    }

    user.status = status;
    await user.save();
    return res.status(200).json({ message: "success update user", data: user });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const changeStatusVendor = async (req, res) => {
  const { status } = req.body;

  try {
    const user = await Vendor.findById(req.params.id);

    if (!user) {
      return res.status(400).json("User not found");
    }

    user.status = status;
    await user.save();
    return res.status(200).json({ message: "success update user", data: user });
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
  changeStatusUser,
  loginAdmin,
  loginVendor,
  registerVendor,
  getVendorById,
  editVendor,
  getAllVendor,
  changeStatusVendor,
};
