const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./Routers/userRouter");
const storeRouter = require("./Routers/storeRouter");
const produkRouter = require("./Routers/produkRouter");
require("./db/mongoose");

dotenv.config();
const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/store", storeRouter);
app.use("/api/produk", produkRouter);
app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
