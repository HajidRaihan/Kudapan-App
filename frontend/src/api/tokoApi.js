import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getAllToko = async () => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
    };

    const responseData = await RequestApi(
      "GET",
      `store/getAll`,
      {},
      headerToken,
      "Mencoba Menampilkan toko"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan toko  ", error);
    throw error;
  }
};

export { getAllToko };
