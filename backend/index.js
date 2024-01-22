const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// const UserModel = require("./Models/User");
// const Store = require("./Models/Store");
const dotenv = require("dotenv");
const userRouter = require("./Routers/userRouter");
const storeRouter = require("./Routers/storeRouter");
require("./db/mongoose");

dotenv.config();
const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URL);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/test", (req, res) => {
//   res.send("Test!");
// });

app.use("/api/users", userRouter);
app.use("/api/store", storeRouter);
app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
