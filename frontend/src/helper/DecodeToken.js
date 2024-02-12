import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const DecodeToken = () => {
  const token = Cookies.get("access_token_kudapan");
  const decoded = jwtDecode(token);
  return decoded;
};

export { DecodeToken };
