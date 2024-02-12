import CounterCard from "../components/CounterCard";
import Kategori from "../components/Kategori";
import BottomNavigation from "../components/BottomNavigation";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { getAllToko } from "../api/tokoApi";

const Home = () => {
  const [counter, setCounter] = useState();
  const [search, setSearch] = useState("");

  console.log();
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
      <SearchBar handler={searchHandler} value={search} />
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
              key={index}
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
    </div>
  );
};

export default Home;
