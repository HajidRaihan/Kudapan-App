import Banner from "../components/Banner";
import MenuCard from "../components/MenuCard";
import BottomNavigation from "../components/BottomNavigation";
import Kategori from "../components/Kategori";
import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { getProduk } from "../api/api";
import { useParams } from "react-router-dom";

const Warung = () => {
  const { id } = useParams();
  const [produk, setProduk] = useState();

  useEffect(() => {
    getProduk(id).then((res) => {
      setProduk(res);
    });
  }, []);

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
        {produk?.map((item) => (
          <MenuCard key={item._id} {...item} />
        ))}
      </div>
      <div className="flex justify-center">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Warung;
