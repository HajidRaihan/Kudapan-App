import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DecodeToken } from "../helper/DecodeToken";
import { TokenHandler } from "../helper/TokenHandler";

const CustomerRoute = ({ children }) => {
  const token = TokenHandler();
  const navigate = useNavigate();
  const tokenData = DecodeToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (tokenData.role === "admin") {
      navigate("/admin");
    } else if (tokenData.role === "vendor") {
      navigate("/vendor");
    }
  }, [token, tokenData, navigate]);

  if (token && tokenData.role === "customer") {
    return <>{children}</>;
  }

  return null;
};

export default CustomerRoute;
