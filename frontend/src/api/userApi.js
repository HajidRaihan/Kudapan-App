import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getUserById = async (userId) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };

  console.log({ asldkjaslkj: userId });

  try {
    const responseData = await RequestApi(
      "GET",
      `user/get/${userId}`,
      {},
      headerToken,
      "Menampilkan user"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan user", error);
  }
};

export { getUserById };
