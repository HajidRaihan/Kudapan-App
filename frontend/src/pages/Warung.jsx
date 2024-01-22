import Banner from "../components/Banner";
import MenuCard from "../components/MenuCard";
import BottomNavigation from "../components/BottomNavigation";
import Kategori from "../components/Kategori";
import BackButton from "../components/BackButton";

const Warung = () => {
  return (
    <>
      <div className="mx-2 absolute z-50 mt-2">
        <BackButton />
      </div>
      <Banner title="Nasi Goreng Masuli" />
      <div className="flex gap-1 mt-2 mx-2 ">
        <Kategori title="All" selected={true} />
        <Kategori title="Makanan" />
        <Kategori title="Minuman" />
        <Kategori title="Dessert" />
      </div>
      <div className="flex flex-wrap gap-5 justify-center mt-5 pb-20 overflow-scroll h-[480px]">
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </div>
      <div className="flex justify-center">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Warung;
