import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const DecodeToken = () => {
  const token = Cookies.get("access_token");
  const decoded = jwtDecode(token);
  return decoded;
};

export { DecodeToken };
