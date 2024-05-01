import Banner from "../components/Banner";
import CounterCard from "../components/card/CounterCard";
import Kategori from "../components/Kategori";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { TokenHandler } from "../helper/TokenHandler";
import { DecodeToken } from "../helper/DecodeToken";
import { getAllToko } from "../api/tokoApi";
import BottomNavigation from "../components/navigation/BottomNavigation";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import FormatRupiah from "../helper/FormatRupiah";
import { Money } from "@styled-icons/boxicons-regular/Money";
import { styled } from "styled-components";
import { getUserById } from "../api/userApi";

const StyledMoney = styled(Money)`
  color: #105a37;
  width: 20px;
`;
const Home = () => {
  const [counter, setCounter] = useState();
  const [userDetail, setUserDetail] = useState();
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = TokenHandler();
    console.log(token);
    const tokenData = DecodeToken();
    console.log({ tokenData });
    setUserId(tokenData._id);
  }, []);

  useEffect(() => {
    const getDetailUser = async () => {
      const res = await getUserById(userId);
      setUserDetail(res);
    };
    if (userId) {
      getDetailUser();
    }
  }, [userId]);

  useEffect(() => {
    try {
      getAllToko(search).then((res) => {
        setCounter(res);
      });
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  console.log(import.meta.env.VITE_API_URL);
  return (
    <MainLayout>
      {/* <StyledIcon /> */}
      {/* <Lock /> */}
      <div className="flex justify-between items-center mt-3 mx-5 ">
        <div>
          <h1 className="font-bold text-md">Hi, {userDetail?.nama}.</h1>
          {userDetail && (
            <div className="text-sm flex items-center gap-1">
              <StyledMoney />
              {/* <p>Rp. {userDetail.saldo}</p> */}
              <p className="text-xs">
                <FormatRupiah value={userDetail.saldo} />
              </p>
            </div>
          )}
        </div>
        <div className="avatar" onClick={() => navigate("/profile")}>
          <div className="w-10 h-10 rounded-full">
            {userDetail?.image !== null ? (
              <img src={`http://localhost:8000/images/${userDetail?.image}`} />
            ) : (
              <img src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg" />
            )}
          </div>
        </div>
      </div>
      <SearchBar handler={searchHandler} value={search} />
      {/* <Banner title="KUDAPAN APP" /> */}
      <div className="flex gap-1 my-5 mx-5">
        <Kategori title="All" selected={true} />
        <Kategori title="Makanan" />
        <Kategori title="Minuman" />
        <Kategori title="Dessert" />
      </div>

      <div className="mx-5 pb-20">
        {counter?.map((data, index) => {
          return (
            <CounterCard
              key={index}
              nama={data.nama}
              deskripsi={data.deskripsi}
              image={data.image}
              id={data._id}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Home;
