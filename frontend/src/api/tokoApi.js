import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getAllToko = async (search) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
    };

    const params = [];
    if (search) {
      params.push(`search=${search}`);
    }
    const pathUrl = `store/getAll?${params.join("&")}`;

    const responseData = await RequestApi(
      "GET",
      pathUrl,
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
