import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const addProduk = async (userId, data) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    };

    const responseData = await RequestApi(
      "POST",
      `produk/add/${userId}`,
      data,
      headerToken,
      "Mencoba menambahkan produk"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menambahkan produk", error);
    throw error;
  }
};

const getDetailProduk = async (produkId) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    };

    const responseData = await RequestApi(
      "GET",
      `produk/get/detail/${produkId}`,
      {},
      headerToken,
      "Mencoba menampilkan detail produk"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan detail produk", error);
    throw error;
  }
};

const deleteProduk = async (userId, produkId) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };

    const responseData = await RequestApi(
      "DELETE",
      `produk/delete/${userId}/${produkId}`,
      {},
      headerToken,
      "Mencoba delete produk"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat delete produk", error);
    throw error;
  }
};

const editProduk = async (userId, produkId, data) => {
  try {
    const token = TokenHandler();

    const headerToken = {
      Authorization: `${token}`,
      "Content-Type": "multipart/form-data",
    };

    const responseData = await RequestApi(
      "PUT",
      `produk/edit/${userId}/${produkId}`,
      data,
      headerToken,
      "Mencoba edit produk"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat edit produk", error);
    throw error;
  }
};

export { addProduk, deleteProduk, editProduk, getDetailProduk };
