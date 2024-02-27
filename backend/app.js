const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const tokoRouter = require("./routers/tokoRouter");
const produkRouter = require("./routers/produkRouter");
const keranjangRouter = require("./routers/keranjangRouter");
const orderRouter = require("./routers/orderRouter");
const historyRouter = require("./routers/historyRouter");

require("./db/mongoose");
const morgan = require("morgan");
const { verifyUser } = require("./middleware/verifyAccessToken");

dotenv.config();
const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/store", tokoRouter);
app.use("/api/produk", produkRouter);
app.use("/api/keranjang", keranjangRouter);
app.use("/api/order", orderRouter);
app.use("/api/history", historyRouter);
app.use("/images", express.static("images"));
// Handling all the unknown endpoints

app.get("/", verifyUser("vendor"), (req, res) => {
  res.send("Hello World!");
});
app.get("/healthceck", (req, res) => {
  res.send("Working!");
});
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});
// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
  next();
  console.log(error);
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
