import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getProduk = async (tokoId, type, search) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
    };

    const params = [];
    if (type === "semua") {
      params.push(`type=`);
    }
    if (type !== "semua" && type !== null) {
      params.push(`type=${type}`);
    }
    if (search) {
      params.push(`search=${search}`);
    }

    const pathUrl = `produk/get/${tokoId}?${params.join("&")}`;
    console.log(pathUrl);

    const responseData = await RequestApi(
      "GET",
      pathUrl,
      {},
      headerToken,
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
