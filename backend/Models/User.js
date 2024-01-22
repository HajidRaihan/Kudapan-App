// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   nama: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   role: {
//     type: String,
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "vendor"], default: "vendor" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
