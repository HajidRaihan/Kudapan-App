import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const addBalance = async (userId, data) => {
  try {
    const token = TokenHandler();
    console.log({ userId });

    const headerToken = {
      Authorization: `${token}`,
    };

    const responseData = await RequestApi(
      "POST",
      `wallet/add/${userId}`,
      data,
      headerToken,
      "Mencoba top up saldo"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat top up saldo", error);
    throw error;
  }
};

export { addBalance };
