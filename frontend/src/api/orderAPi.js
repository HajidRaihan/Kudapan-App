import { RequestApi } from "../helper/RequestApi";
import { TokenHandler } from "../helper/TokenHandler";

const addOrder = async (userId, meja) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "aplication/json",
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
    throw error;
  }
};

const getDetailOrder = async (orderId) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "aplication/json",
  };

  try {
    const responseData = await RequestApi(
      "GET",
      `order/get/detail/${orderId}`,
      {},
      headerToken,
      "menampilkasn order"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkasn order", error);
    throw error;
  }
};

const orderPayment = async (data, userId, orderId) => {
  const token = TokenHandler();

  const headerToken = {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  };

  console.log({ data });

  try {
    const responseData = await RequestApi(
      "POST",
      `order/payment/${userId}/${orderId}`,
      JSON.stringify(data),
      headerToken,
      "membayar order"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat membayar order", error);
    throw error;
  }
};

export { addOrder, getDetailOrder, orderPayment };
