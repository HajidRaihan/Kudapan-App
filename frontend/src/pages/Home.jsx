import Banner from "../components/Banner";
import CounterCard from "../components/CounterCard";
import Kategori from "../components/Kategori";
import BottomNavigation from "../components/BottomNavigation";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

const Home = () => {
  const [counter, setCounter] = useState();
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
      <Banner title="KUDAPAN APP" />
      <div className="flex gap-1 mt-2 mx-2 ">
        <Kategori title="All" selected={true} />
        <Kategori title="Makanan" />
        <Kategori title="Minuman" />
        <Kategori title="Dessert" />
      </div>
      <div className="mx-5 my-5">
        <p className="font-semibold text-xl">list counter</p>
      </div>

      <div className="mx-5 pb-20">
        {counter?.map((data, index) => {
          return <CounterCard nama={data.nama} />;
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
