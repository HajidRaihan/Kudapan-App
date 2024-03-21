import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const DecodeToken = () => {
  const token = Cookies.get("access_token_kudapan");
  if (token === null || token === undefined) {
    location.href = "/login";
    return;
  }
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { DecodeToken };
