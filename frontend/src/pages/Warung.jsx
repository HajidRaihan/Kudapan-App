import BottomNavigation from "../components/navigation/BottomNavigation";
import Kategori from "../components/Kategori";
import { useEffect, useState } from "react";
import { getProduk } from "../api/api";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MenuCard from "../components/card/MenuCard";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";

const Warung = () => {
  const { tokoId } = useParams();
  const [tokoData, setTokoData] = useState();
  const [selectedKategori, setSelectedKategori] = useState("semua");
  const [search, setSearch] = useState("");
  const [orderCount, setOrderCount] = useState(true);

  useEffect(() => {
    getProduk(tokoId, selectedKategori, search).then((res) => {
      setTokoData(res);
      console.log(res);
    });
  }, [tokoId, selectedKategori, search]);

  const selectedKategoriHandler = (kategori) => {
    setSelectedKategori(kategori);
  };

  const listKategori = ["semua", "makanan", "minuman"];

  return (
    <MainLayout>
      {tokoData ? (
        <>
          <Header title={tokoData.toko} />
          <Toaster />
          <SearchBar value={search} handler={(e) => setSearch(e.target.value)} />
          <div className="flex gap-1 mt-2 mx-5 ">
            {listKategori.map((data, index) => {
              return (
                <Kategori
                  key={index}
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
                <MenuCard
                  key={item._id}
                  {...item}
                  isSuccess={() => toast.success("berhasil menambahkan ke keranjang")}
                  isError={() => toast.error("gagal menambahkan ke keranjang")}
                  setOrderCount={setOrderCount}
                />
              </>
            ))}
          </div>
          <div className="flex justify-center">
            <BottomNavigation orderCount={orderCount} />
          </div>
        </>
      ) : (
        ""
      )}
    </MainLayout>
  );
};

export default Warung;
