import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const DecodeToken = () => {
  // const { pathname } = useLocation();
  const token = Cookies.get("access_token_kudapan");
  if (location.pathname.includes("login")) {
    return;
  }
  if (token === null || token === undefined) {
    location.href = "/login";
    return;
  }
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error(error);
    location.href = "/login";

    return null;
  }
};

export { DecodeToken };
