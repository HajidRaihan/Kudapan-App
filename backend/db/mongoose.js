const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/kudapan")
  .then(() => console.log("database connected"))
  .catch((err) => console.log("database connecttion is error", err));
