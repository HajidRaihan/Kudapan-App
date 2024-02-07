const { User } = require("../models");

const getPesananUserByToko = async (res, res) => {
  const { tokoId } = req.params;
  //   const user = await User.findById(tokoId);

  const pesanan = await User.find({ toko: tokoId });

  if (!pesanan || !pesanan.length) return res.status(404).json({ error: "Pesanan not found" });
};
