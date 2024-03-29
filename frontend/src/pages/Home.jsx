import Banner from "../components/Banner";
import CounterCard from "../components/card/CounterCard";
import Kategori from "../components/Kategori";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { TokenHandler } from "../helper/TokenHandler";
import { DecodeToken } from "../helper/DecodeToken";
import { getAllToko } from "../api/tokoApi";
import BottomNavigation from "../components/navigation/BottomNavigation";

const Home = () => {
  const [counter, setCounter] = useState();
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = TokenHandler();
    console.log(token);
    const tokenData = DecodeToken();
    console.log(tokenData.nama);
    setUser(tokenData.nama);
  }, []);

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

  return (
    <div className="lg:mx-96">
      <h1 className="mx-5 font-bold text-md mt-5">Hi, {user}.</h1>
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
      <div className="flex justify-center">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Home;
