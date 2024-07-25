import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const getPesanan = async (userId, startDate, endDate) => {
  try {
    const token = TokenHandler();
    // console.log({ userId });

    const headerToken = {
      Authorization: `${token}`,
    };

    let params = [];

    if (startDate) {
      params.push(`startDate=${startDate}`);
    }

    if (endDate) {
      params.push(`endDate=${endDate}`);
    }

    const responseData = await RequestApi(
      "GET",
      `order/get/${userId}?${params.join("&")}`,
      {},
      headerToken,
      "Mencoba Menampilkan riwayat pesanan"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan pesanan  ", error);
    throw error;
  }
};

const changeStatusOrder = async (userId, orderId, data) => {
  try {
    const token = TokenHandler();
    console.log({ userId });

    const headerToken = {
      Authorization: `${token}`,
    };

    const responseData = await RequestApi(
      "POST",
      `order/status/${userId}/${orderId}`,
      data,
      headerToken,
      "Mencoba mengubah status pesanan"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat mengubah status pesanan", error);
    throw error;
  }
};

const deleteRiwayatPesanan = async (userId) => {
  try {
    const token = TokenHandler();
    console.log({ userId });

    const headerToken = {
      Authorization: `${token}`,
    };

    const responseData = await RequestApi(
      "DELETE",
      `pesanan/delete/${userId}`,
      {},
      headerToken,
      "Mencoba menghapus riwayat pesanan"
    );

    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus riwayat pesanan", error);
    throw error;
  }
};

export { getPesanan, changeStatusOrder, deleteRiwayatPesanan };
