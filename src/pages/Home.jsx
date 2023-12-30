import Banner from "../components/Banner";
import CounterCard from "../components/CounterCard";
import Kategori from "../components/Kategori";
import BottomNavigation from "../components/BottomNavigation";

const Home = () => {
  return (
    <>
      <Banner title="Welcome" />
      <div className="flex gap-1 mt-2 mx-2 ">
        <Kategori title="All" selected={true} />
        <Kategori title="Makanan" />
        <Kategori title="Minuman" />
        <Kategori title="Dessert" />
      </div>
      <div className="mx-5 my-5">
        <p className="font-semibold text-xl">list counter</p>
      </div>

      <div className="mx-5 h-screen">
        <CounterCard />
        <CounterCard />
        <CounterCard />
      </div>
      <div className="flex justify-center">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Home;
