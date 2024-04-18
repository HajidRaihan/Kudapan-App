import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getPesanan = async (userId) => {
  try {
    const token = TokenHandler();
    console.log({ userId });

    const headerToken = {
      Authorization: `${token}`,
    };

    const responseData = await RequestApi(
      "GET",
      `order/get/${userId}`,
      {},
      headerToken,
      "Mencoba Menampilkan pesanan"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan pesanan  ", error);
    throw error;
  }
};

export { getPesanan };