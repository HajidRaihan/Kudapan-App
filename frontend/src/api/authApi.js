import Cookies from "js-cookie";
import { RequestApi } from "../helper/RequestApi";
import { jwtDecode } from "jwt-decode";

const registerUser = async (data) => {
  try {
    const response = await RequestApi("POST", "user/register", data, {}, "Mencoba register");
    return response;
  } catch (error) {
    console.error("terjadi kesalahan saat register", error);
    throw error;
  }
};

const loginUser = async (credential) => {
  try {
    const response = await RequestApi("POST", "user/login", credential, {}, "Mencoba login");
    Cookies.set("access_token_kudapan", response.token, { expires: 7 });
    const token = response.token;
    const decoded = jwtDecode(token);
    console.log(decoded);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginVendor = async (credential) => {
  try {
    const response = await RequestApi(
      "POST",
      "user/login/vendor",
      credential,
      {},
      "Mencoba login vendor"
    );
    Cookies.set("access_token_kudapan", response.token, { expires: 7 });
    const token = response.token;
    const decoded = jwtDecode(token);
    console.log(decoded);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginAdmin = async (credential) => {
  try {
    const response = await RequestApi(
      "POST",
      "user/login/admin",
      credential,
      {},
      "Mencoba login admin"
    );
    Cookies.set("access_token_kudapan", response.token, { expires: 7 });
    const token = response.token;
    const decoded = jwtDecode(token);
    console.log(decoded);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { registerUser, loginUser, loginVendor, loginAdmin };
