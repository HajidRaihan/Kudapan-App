const { User } = require("../models");

const getHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const history = user.order_history;

    return res.json(history);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "gagal menampilkan history", error });
  }
};

module.exports = { getHistory };
