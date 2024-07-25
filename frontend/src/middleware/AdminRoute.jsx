import React from "react";
import { DecodeToken } from "../helper/DecodeToken";
import { TokenHandler } from "../helper/TokenHandler";

const AdminRoute = ({ children }) => {
  const token = TokenHandler();
  console.log(token);
  const tokenData = DecodeToken();
  console.log("ini token data dari route", tokenData);

  if (!token) {
    navigate("/login");
  }
  if (token && tokenData.role !== "admin") {
    navigate("/");
  }
  if (tokenData.role === "admin") {
    return <>{children}</>;
  }
};

export default AdminRoute;
