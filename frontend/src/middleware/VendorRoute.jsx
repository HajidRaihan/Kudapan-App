import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserById } from "../api/userApi";
import ErrorModal from "../components/modals/ErrorModal";
import { DecodeToken } from "../helper/DecodeToken";
import { TokenHandler } from "../helper/TokenHandler";

const VendorRoute = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const token = TokenHandler();
  const tokenData = DecodeToken();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getUserById(tokenData._id);
        setUserDetail(res);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [tokenData._id]);

  if (!token) {
    navigate("/login");
    return null;
  }

  if (token && tokenData.role === "customer") {
    navigate("/");
    console.log("anda bukan vendor");
    return null;
  }
  // if (token && tokenData.role === "vendor") {
  //   location.href = "/vendor";
  //   return null;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (token && tokenData.role === "vendor") {
    return (
      <>
        {userDetail?.toko === null && location.pathname !== "/create-toko" ? (
          <ErrorModal
            title="Anda harus membuat toko"
            action="Buat Toko"
            handler={() => navigate("/create-toko")}
          />
        ) : (
          <>{children}</>
        )}
      </>
    );
  }

  return null;
};

export default VendorRoute;
