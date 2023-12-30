import Banner from "../components/Banner";
import MenuCard from "../components/MenuCard";
import BottomNavigation from "../components/BottomNavigation";

const Warung = () => {
  return (
    <>
      <Banner title="Nasi Goreng Masuli" />
      <div className="flex flex-wrap gap-5 justify-center mt-5 mb-20">
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
