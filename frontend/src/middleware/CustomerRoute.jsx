import React from "react";
import { DecodeToken } from "../helper/DecodeToken";
import { TokenHandler } from "../helper/TokenHandler";

const CustomerRoute = ({ children }) => {
  const token = TokenHandler();
  console.log(token);
  const tokenData = DecodeToken();
  console.log("ini token data dari route", tokenData);

  if (!token) {
    location.href = "/login";
  }
  if (token && tokenData.role !== "customer") {
    location.href = "/";
  }
  if (tokenData.role === "customer") {
    return <>{children}</>;
  }
};

export default CustomerRoute;
