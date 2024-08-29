const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// const mongodb = "mongodb+srv://root:31072002@atlascluster.oh7ia.mongodb.net/kudapan_db";
const mongodb = "mongodb://localhost:27017/kudapan";

mongoose
  .connect("mongodb://127.0.0.1:27017/kudapan")
  .then(() => console.log("database connected"))
  .catch((err) => console.log("database connecttion is error", err));
