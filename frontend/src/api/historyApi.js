import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getHistory = async (userId, status, page) => {
  const token = TokenHandler();

  const headerToken = {
    Authorization: `${token}`,
  };

  // Construct query string with status and page
  const queryParams = new URLSearchParams();
  if (status) queryParams.append("status", status);
  if (page) queryParams.append("page", page);

  // Route with query parameters
  const route = `history/get/${userId}?${queryParams.toString()}`;

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
