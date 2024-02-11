import Banner from "../components/Banner";
import MenuCard from "../components/MenuCard";
import BottomNavigation from "../components/BottomNavigation";
import Kategori from "../components/Kategori";
import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { getProduk } from "../api/api";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const Warung = () => {
  const { tokoId } = useParams();
  const [produk, setProduk] = useState();
  const [tokoData, setTokoData] = useState();

  useEffect(() => {
    getProduk(tokoId).then((res) => {
      setTokoData(res);
      console.log(res);
    });
  }, []);

  return (
    <>
      {tokoData ? (
        <>
          <Header title={tokoData.toko} />
          <div className="flex gap-1 mt-2 mx-5 ">
            <Kategori title="All" selected={true} />
            <Kategori title="Makanan" />
            <Kategori title="Minuman" />
            <Kategori title="Dessert" />
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-5 mb-20 ">
            {tokoData.produk.map((item) => (
              <>
                <MenuCard key={item._id} {...item} />
              </>
            ))}
          </div>
          <div className="flex justify-center">
            <BottomNavigation />
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Warung;
