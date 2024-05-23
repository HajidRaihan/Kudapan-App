import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getHistory = async (userId, status) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };
  let route;

  if (status) {
    route = `history/get/${userId}?status=${status}`;
  } else {
    route = `history/get/${userId}`;
  }

  try {
    const responseData = await RequestApi("GET", route, {}, headerToken, "Menampilkan history");
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan history", error);
  }
};

const deleteHistory = async (userId) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };

  try {
    const responseData = await RequestApi(
      "DELETE",
      `history/delete/${userId}`,
      {},
      headerToken,
      "Menghapus history"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus history", error);
  }
};

export { getHistory, deleteHistory };
