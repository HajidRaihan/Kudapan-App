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

const getVendorById = async (userId) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };

  console.log({ userId });

  try {
    const responseData = await RequestApi(
      "GET",
      `user/get/vendor/${userId}`,
      {},
      headerToken,
      "Menampilkan user"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan user", error);
  }
};

const getAllUser = async () => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };

  try {
    const responseData = await RequestApi("GET", `user/get`, {}, headerToken, "Menampilkan user");
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan user", error);
  }
};

const getAllVendor = async () => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
  };

  try {
    const responseData = await RequestApi(
      "GET",
      `user/getVendor`,
      {},
      headerToken,
      "Menampilkan vendor"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat menampilkan vendor", error);
  }
};

const editProfile = async (userId, data) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "multipart/form-data",
  };

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
    throw error;
  }
};

const editVendor = async (userId, data) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "multipart/form-data",
  };

  console.log({ userId });

  try {
    const responseData = await RequestApi(
      "PUT",
      `user/edit/vendor/${userId}`,
      data,
      headerToken,
      "edit vendor"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat edit vendor", error);
    throw error;
  }
};

const changeStatusUser = async (userId, data) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "application/json",
  };

  console.log(data);

  try {
    const responseData = await RequestApi(
      "PUT",
      `user/status/${userId}`,
      data,
      headerToken,
      "change status user"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan ubah status user", error);
    throw error;
  }
};

const changeStatusVendor = async (userId, data) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "application/json",
  };

  console.log(data);

  try {
    const responseData = await RequestApi(
      "PUT",
      `user/status/vendor/${userId}`,
      data,
      headerToken,
      "change status vendor"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan ubah status vendor", error);
    throw error;
  }
};

const deleteUser = async (userId, data) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "application/json",
  };

  console.log(data);

  try {
    const responseData = await RequestApi(
      "DELETE",
      `user/delete/${userId}`,
      data,
      headerToken,
      "delete user"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat delete user", error);
    throw error;
  }
};

const deleteVendor = async (userId, data) => {
  const tokken = TokenHandler();

  const headerToken = {
    Authorization: `${tokken}`,
    "Content-Type": "application/json",
  };

  console.log(data);

  try {
    const responseData = await RequestApi(
      "DELETE",
      `user/delete/vendor/${userId}`,
      data,
      headerToken,
      "delete vendor"
    );
    return responseData;
  } catch (error) {
    console.error("Terjadi kesalahan saat delete vendor", error);
    throw error;
  }
};

export {
  getUserById,
  editProfile,
  getAllUser,
  changeStatusUser,
  getVendorById,
  editVendor,
  getAllVendor,
  changeStatusVendor,
  deleteUser,
  deleteVendor,
};
