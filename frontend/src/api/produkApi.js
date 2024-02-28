import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const addProduk = async (userId, data) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    };

    const responseData = await RequestApi(
      "POST",
      `produk/add/${userId}`,
      data,
      headerToken,
      "Mencoba menambahkan produk",
      "multipart/form-data"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan produk", error);
    throw error;
  }
};

export { addProduk };
