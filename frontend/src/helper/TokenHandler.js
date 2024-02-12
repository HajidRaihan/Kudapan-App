import Cookies from "js-cookie";

const TokenHandler = () => {
  const token = Cookies.get("access_token_kudapan");
  return token;
};

export { TokenHandler };
