import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const addProdukKeranjang = async (userId, data) => {
  const token = TokenHandler();
  const headerToken = {
    Authorization: `${token}`,
  };
  try {
    const responseData = await RequestApi(
      "POST",
      `keranjang/add/${userId}`,
      data,
      headerToken,
      "menambahkan produk ke keranjang"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan produk ke keranjang", error);
    throw error;
  }
};

const getKeranjang = async (userId) => {
  const token = TokenHandler();
  const headerToken = {
    Authorization: `${token}`,
  };

  try {
    const responseData = await RequestApi(
      "GET",
      `keranjang/get/${userId}`,
      {},
      headerToken,
      "mengambil keranjang"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil keranjang", error);
    throw error;
  }
};

export { addProdukKeranjang, getKeranjang };
