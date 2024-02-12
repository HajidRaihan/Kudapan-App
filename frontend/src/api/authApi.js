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
  console.log("lahh");
  try {
    const response = await RequestApi("POST", "user/login", credential, {}, "Mencoba login");
    Cookies.set("access_token_kudapan", response.token, { expires: 7 });
    const token = response.token;
    const decoded = jwtDecode(token);
    console.log(decoded);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, loginUser };
