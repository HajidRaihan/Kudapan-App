import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const addOrder = async (userId, meja) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };

  try {
    const responseData = await RequestApi(
      "POST",
      `order/add/${userId}/${meja}`,
      {},
      headerToken,
      "Membuat order"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat order", error);
  }
};

export { addOrder };
