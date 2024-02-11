import Cookies from "js-cookie";

const TokenHandler = () => {
  const token = Cookies.get("access_token");
  return token;
};

export { TokenHandler };
