import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { changeTokoStatus, getDetailTokoByUserId } from "../../api/tokoApi";
import { getUserById, getVendorById } from "../../api/userApi";
import VendorLayout from "../../components/layout/VendorLayout";
import { DecodeToken } from "../../helper/DecodeToken";
import { Money } from "@styled-icons/boxicons-regular/Money";
import { styled } from "styled-components";
import FormatRupiah from "../../helper/FormatRupiah";
import Header from "../../components/Header";
import EditIcon from "../../assets/icon/edit.svg";
import Cookies from "js-cookie";
import EditProfileModal from "../../components/modals/EditProfileModal";
import EditTokoModal from "../../components/modals/EditTokoModal";
import Loader from "../../components/Loader";

const StyledMoney = styled(Money)`
  color: #105a37;
  width: 20px;
`;
const ProfileVendor = () => {
  const [detailToko, setDetailToko] = useState();
  const [userId, setUserId] = useState();
  const [userDetail, setUserDetail] = useState();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editTokoOpen, setEditTokoOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const tokenData = DecodeToken();
    console.log({ tokenData });
    console.log(tokenData._id);
    setUserId(tokenData._id);
  }, []);

  useEffect(() => {
    const getDetailUser = async () => {
      try {
        const res = await getVendorById(userId);
        console.log(res);
        setUserDetail(res);
      } catch (error) {
        console.error("Gagal mendapatkan detail user:", error);
      }
    };
    if (userId) {
      getDetailUser();
    }
  }, [userId]);

  useEffect(() => {
    const getDetailToko = async () => {
      try {
        const res = await getDetailTokoByUserId(userId);
        console.log(res);
        setDetailToko(res);
      } catch (error) {
        console.error("Gagal mendapatkan detail toko:", error);
      }
    };
    if (userId) {
      getDetailToko();
    }
  }, [userId]);

  const editProfileOpenHandler = () => {
    setEditProfileOpen(true);
    console.log("clocked");
  };

  const editTokoOpenHandler = () => {
    setEditTokoOpen(true);
    console.log("clocked");
  };

  const logoutHanlder = () => {
    Cookies.remove("access_token_kudapan");
    window.location.reload();
  };

  const changeStatusHandler = async () => {
    const newStatus = detailToko.toko_status === "open" ? "close" : "open";

    setStatusLoading(true);
    try {
      const res = await changeTokoStatus({ status: newStatus }, userId);
      setStatusLoading(false);
      toast.success("sukses mengubah status toko");
      setDetailToko({ ...detailToko, toko_status: newStatus });
      console.log(res);
    } catch (err) {
      setStatusLoading(false);
      console.log(err);
      toast.error("gagal mengubah status toko");
    }
  };
  return (
    <div className="lg:flex flex-col items-center ">
      <VendorLayout>
        <Toaster />
        <Header title="Profile" />
        {userDetail && detailToko ? (
          <div className="lg:w-[700px] mx-5 mt-5 mb-20">
            <Toaster />

            <div className="border p-3 rounded-xl shadow-lg relative">
              {/* <h1 className="text-lg font-bold">Profile</h1> */}
              <h1 className="text-md font-bold">{userDetail.nama}</h1>
              <p>{userDetail.email}</p>
              <div className="text-sm flex items-center gap-1">
                <StyledMoney />
                {/* <p>Rp. {userDetail.saldo}</p> */}
                <p className="text-sm">
                  <FormatRupiah value={userDetail?.saldo} />
                </p>
              </div>
              <div
                onClick={editProfileOpenHandler}
                className="btn btn-success p-2 w-fit h-fit  rounded-lg  btn-sm mr-1 absolute bottom-2 right-2"
              >
                <img src={EditIcon} alt="" className="h-4 w-4 " />
              </div>
            </div>

            {/* <div className="my-3 w-full h-0.5 bg-black" /> */}
            <div className="border p-3 rounded-xl shadow-lg mt-5 relative">
              {/* <h1 className="text-lg font-bold">Toko</h1> */}

              <div>
                <h1 className="text-md font-bold">{detailToko.nama}</h1>
                <p>{detailToko.deskripsi}</p>
              </div>
              <div className="mt-3 mb-10">
                <img
                  src={`${import.meta.env.VITE_IMGURL}/${detailToko.image}`}
                  alt=""
                  className="rounded-lg w-full max-h-[200px] object-cover object-center"
                />
              </div>
              <div
                onClick={editTokoOpenHandler}
                className="btn btn-success p-2 w-fit h-fit  rounded-lg  btn-sm mr-1 absolute bottom-2 right-2"
              >
                <img src={EditIcon} alt="" className="h-4 w-4 " />
              </div>
            </div>
            <button
              className={`btn relative ${
                detailToko.toko_status === "open"
                  ? "bg-warning btn-warning"
                  : "bg-success btn-success"
              }  w-full mt-3 text-white hover:opacity-85 `}
              onClick={changeStatusHandler}
              disabled={statusLoading}
            >
              {statusLoading && <span className="loading loading-spinner loading-sm"></span>}
              {detailToko.toko_status === "open" ? "Close Order" : "Open Order"}
            </button>
            <button
              className="btn bg-primary w-full mt-3 text-white btn-error"
              onClick={logoutHanlder}
            >
              Logout
            </button>
          </div>
        ) : (
          <Loader />
        )}
        {editProfileOpen ? (
          <EditProfileModal
            detailProfile={userDetail}
            isSuccess={() => toast.success("sukses edit profile")}
            isError={() => toast.error("terjadi kesalahan saat edit profile")}
            close={() => setEditProfileOpen(false)}
            userId={userId}
            setUserDetail={setUserDetail}
          />
        ) : (
          ""
        )}
        {editTokoOpen ? (
          <EditTokoModal
            detailToko={detailToko}
            isSuccess={() => toast.success("sukses edit toko")}
            isError={() => toast.error("terjadi kesalahan saat edit toko")}
            close={() => setEditTokoOpen(false)}
            setDetailToko={setDetailToko}
          />
        ) : (
          ""
        )}
      </VendorLayout>
    </div>
  );
};

export default ProfileVendor;
