import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { getUserById } from "../api/userApi";
import { DecodeToken } from "../helper/DecodeToken";
import { TokenHandler } from "../helper/TokenHandler";
import { Money } from "@styled-icons/boxicons-regular/Money";
import { styled } from "styled-components";
import FormatRupiah from "../helper/FormatRupiah";
import MainLayout from "../components/layout/MainLayout";
import { MoneyWithdraw } from "@styled-icons/boxicons-regular/MoneyWithdraw";
import { Edit } from "@styled-icons/boxicons-solid/Edit";
import { LogOut } from "@styled-icons/boxicons-regular/LogOut";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { addBalance } from "../api/walletApi";
import TopUpModal from "../components/modals/TopUpModal";
import { useNavigate } from "react-router-dom";

const MoneyIcon = styled(Money)`
  color: #105a37;
  width: 24px;
`;

const EditIcon = styled(Edit)`
  color: #4c4c4c;
  width: 24px;
`;

const LogOutIcon = styled(LogOut)`
  color: #4c4c4c;
  width: 24px;
`;

const MoneyWithDrawIcon = styled(MoneyWithdraw)`
  color: #4c4c4c;
  width: 24px;
`;

const Profile = () => {
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = TokenHandler();
    const decoded = DecodeToken(token);
    setUserId(decoded._id);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserById(userId);
      console.log(res);
      setUserData(res);
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const topUpHandler = async () => {
    const res = await addBalance(userId, { saldo: parseInt(balance) });
    console.log(res);
    window.location.reload();
  };

  const logoutHanlder = () => {
    Cookies.remove("access_token_kudapan");
    window.location.reload();
  };

  return (
    <MainLayout>
      <div>
        <div className="relative">
          <div className="mx-5 absolute z-50 mt-1">
            <BackButton />
          </div>
          {/* <Banner title="Nasi Goreng Masuli" /> */}

          <h1 className="text-xl font-bold text-center my-5">Profile</h1>
          {/* <img src={MenuIcon} alt="" className="absolute top-0 right-5" /> */}
          {/* <div className="absolute -top-3 right-5">
            <MenuDropdown userId={userId} />
          </div> */}
        </div>
      </div>
      {userData ? (
        <div className="mt-10 mx-5">
          <div className="flex items-center gap-5">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  src={`http://localhost:8000/images/${userData.image}`}
                  alt=""
                  // className="w-20 h-20"
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold">{userData.nama}</p>
              <p className="text-sm">{userData.email}</p>
              <div className="text-sm flex items-center gap-1">
                <MoneyIcon />
                {/* <p>Rp. {userData.saldo}</p> */}
                <FormatRupiah value={userData.saldo} />
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-1 mt-14 pt-3 pb-3  -t border-b border-[#4c4c4c] hover:bg-slate-100"
            onClick={() => setTopUpModalOpen(true)}
          >
            <MoneyWithDrawIcon />
            <p>Top up Saldo</p>
          </div>
          <div
            className="flex items-center gap-1 pt-3 pb-3 border-b border-[#4c4c4c] hover:bg-slate-100"
            onClick={() => navigate("/edit/profile")}
          >
            <EditIcon />
            <p>Edit Profile</p>
          </div>
          <div
            className="flex items-center gap-1 pt-3 pb-3 border-b border-[#4c4c4c] hover:bg-slate-100"
            onClick={logoutHanlder}
          >
            <LogOutIcon />
            <p>Logout</p>
          </div>
        </div>
      ) : (
        <p>loading ...</p>
      )}

      {topUpModalOpen && (
        <TopUpModal
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          handler={topUpHandler}
          close={() => setTopUpModalOpen(false)}
        />
      )}
    </MainLayout>
  );
};

export default Profile;
