import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getHistory = async (userId) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };

  try {
    const responseData = await RequestApi(
      "GET",
      `history/get/${userId}`,
      {},
      headerToken,
      "Menampilkan history"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan history", error);
  }
};

export { getHistory };
