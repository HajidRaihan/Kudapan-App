import React from "react";
import { useNavigate } from "react-router-dom";
import { TokenHandler } from "../helper/TokenHandler";

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const token = TokenHandler();
  if (token) {
    return <>{props.children}</>;
  } else {
    navigate("/login");
  }
};

export default PrivateRoute;
