import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getAllToko = async (search = "", page) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
    };

    const params = [];
    if (search) {
      params.push(`search=${search}`);
    }
    if (page) {
      params.push(`page=${page}`);
    }
    const pathUrl = `store/getAll?${params.join("&")}`;

    console.log({ pathUrl });

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

const getDetailTokoByUserId = async (userId) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
    };

    const responseData = await RequestApi(
      "GET",
      `store/get/${userId}`,
      {},
      headerToken,
      "Mencoba Menampilkan detail toko"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan detail toko  ", error);
    throw error;
  }
};

const createToko = async (data, userId) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    };

    const responseData = await RequestApi(
      "POST",
      `store/add/${userId}`,
      data,
      headerToken,
      "Mencoba membuat toko"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat toko  ", error);
    throw error;
  }
};

const editToko = async (data, tokoId) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    };

    const responseData = await RequestApi(
      "PUT",
      `store/update/${tokoId}`,
      data,
      headerToken,
      "Mencoba edit toko"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat edit toko  ", error);
    throw error;
  }
};

const changeTokoStatus = async (data, tokoId) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };

    // return console.log({ data });

    const responseData = await RequestApi(
      "PUT",
      `store/status/${tokoId}`,
      data,
      headerToken,
      "Mencoba status toko"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat status toko  ", error);
    throw error;
  }
};

export { getAllToko, getDetailTokoByUserId, createToko, editToko, changeTokoStatus };
