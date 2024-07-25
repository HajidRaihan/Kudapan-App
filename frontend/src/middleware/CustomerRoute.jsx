import React from "react";
import { useNavigate } from "react-router-dom";
import { DecodeToken } from "../helper/DecodeToken";
import { TokenHandler } from "../helper/TokenHandler";

const CustomerRoute = ({ children }) => {
  const token = TokenHandler();
  const navigate = useNavigate();
  console.log(token);
  const tokenData = DecodeToken();
  console.log("ini token data dari route", tokenData);

  if (!token) {
    navigate("/login");
  }
  if (token && tokenData.role === "admin") {
    navigate("/admin");
  }
  if (token && tokenData.role === "vendor") {
    navigate("/vendor");
  }
  if (token && tokenData.role === "customer") {
    return <>{children}</>;
  }
};

export default CustomerRoute;
