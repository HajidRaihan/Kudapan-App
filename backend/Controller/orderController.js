const { User, Order } = require("../Models");

const addOrder = async (req, res) => {
  const { userId, keranjangId } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const newOrder = new Order({
    keranjang: [],
    total: 0,
    status: "diproses",
  });
  await newOrder.save();

  user.orders.push(newOrder);
  user.save();
};
