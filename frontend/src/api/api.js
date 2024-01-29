import { RequestApi } from "../helper/RequestApi";

const getProduk = async (tokoId) => {
  try {
    // const token = TokenHelper();

    // const headerToken = {
    //   Authorization: `Bearer ${token}`,
    // };

    const responseData = await RequestApi(
      "GET",
      `produk/get/${tokoId}`,
      {},
      {},
      "Mencoba Menampilkan produk"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan produk  ", error);
    throw error;
  }
};
const getDetailProduk = async (id) => {
  try {
    const responseData = await RequestApi(
      "GET",
      `produk/get/detail/${id}`,
      {},
      {},
      "Mengambil data detail produk"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data detail produk", error);
    throw error;
  }
};

export { getProduk, getDetailProduk };
