import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TokenHandler = () => {
  // const navigate = useNavigate();
  const token = Cookies.get("access_token_kudapan");
  if (!token) {
    location.href = "/login";
  }
  return token;
};

export { TokenHandler };
