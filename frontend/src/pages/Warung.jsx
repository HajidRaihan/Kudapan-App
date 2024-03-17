import Banner from "../components/Banner";
import MenuCard from "../components/MenuCard";
import BottomNavigation from "../components/BottomNavigation";
import Kategori from "../components/Kategori";
import BackButton from "../components/BackButton";
import { useEffect, useState } from "react";
import { getProduk } from "../api/api";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const Warung = () => {
  const { tokoId } = useParams();
  const [tokoData, setTokoData] = useState();
  const [selectedKategori, setSelectedKategori] = useState("semua");

  useEffect(() => {
    getProduk(tokoId, selectedKategori).then((res) => {
      setTokoData(res);
      console.log(res);
    });
  }, [tokoId, selectedKategori]);

  const selectedKategoriHandler = (kategori) => {
    setSelectedKategori(kategori);
  };

  const listKategori = ["semua", "makanan", "minuman"];

  return (
    <>
      {tokoData ? (
        <>
          <Header title={tokoData.toko} />
          <SearchBar />
          <div className="flex gap-1 mt-2 mx-5 ">
            {listKategori.map((data) => {
              return (
                <Kategori
                  title={data}
                  selected={data === selectedKategori}
                  handler={() => selectedKategoriHandler(data)}
                />
              );
            })}
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
