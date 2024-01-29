import { RequestApi } from "../helper/RequestApi";

const addProdukKeranjang = async (userId, data) => {
  //   const token = TokenHandler();
  try {
    const responseData = await RequestApi(
      "POST",
      `keranjang/add/${userId}`,
      data,
      {},
      "menambahkan produk ke keranjang"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan produk ke keranjang", error);
    throw error;
  }
};

export { addProdukKeranjang };
