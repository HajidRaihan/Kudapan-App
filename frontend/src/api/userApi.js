import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getUserById = async (userId) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };

  console.log({ userId });

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

const editProfile = async (userId, data) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "multipart/form-data",
  };

  console.log({ userId });

  try {
    const responseData = await RequestApi(
      "PUT",
      `user/edit/${userId}`,
      data,
      headerToken,
      "edit user"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat edit user", error);
  }
};

export { getUserById, editProfile };
