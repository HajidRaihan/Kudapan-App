import Banner from "../components/Banner";
import CounterCard from "../components/CounterCard";
import Kategori from "../components/Kategori";
import BottomNavigation from "../components/BottomNavigation";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { TokenHandler } from "../helper/TokenHandler";
import { DecodeToken } from "../helper/DecodeToken";

const Home = () => {
  const [counter, setCounter] = useState();
  const token = TokenHandler();
  console.log(token);
  const tokenData = DecodeToken();
  console.log(tokenData);

  console.log();
  useEffect(() => {
    try {
      const getCounter = async () => {
        let response = await fetch(`http://localhost:8000/api/store/getAll`);
        const data = await response.json();
        console.log(data);
        setCounter(data);
      };
      getCounter();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SearchBar />
      {/* <Banner title="KUDAPAN APP" /> */}
      <div className="flex gap-1 my-5 mx-5">
        <Kategori title="All" selected={true} />
        <Kategori title="Makanan" />
        <Kategori title="Minuman" />
        <Kategori title="Dessert" />
      </div>
      {/* <div className="mx-5 my-5">
        <p className="font-semibold text-xl">list counter</p>
      </div> */}

      <div className="mx-5 pb-20">
        {counter?.map((data, index) => {
          return (
            <CounterCard
              nama={data.nama}
              deskripsi={data.deskripsi}
              image={data.image}
              id={data._id}
            />
          );
        })}
        {/* <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard />
        <CounterCard /> */}
      </div>
      <div className="flex justify-center">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Home;
