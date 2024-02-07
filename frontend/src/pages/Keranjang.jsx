import { useEffect, useState } from "react";
import { getKeranjang } from "../api/keranjangApi";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import KeranjangCard from "../components/KeranjangCard";
import { DecodeToken } from "../helper/DecodeToken";

const Keranjang = () => {
  const [keranjangData, setKeranjangData] = useState();
  const [totalHarga, setTotalHarga] = useState();

  useEffect(() => {
    const getKeranjangUser = async () => {
      const token = DecodeToken();
      const userId = token._id;
      const keranjang = await getKeranjang(userId);
      console.log(keranjang.list);
      setKeranjangData(keranjang.list);
    };
    getKeranjangUser();
  }, []);
  return (
    <div>
      <Header title="Keranjang" />
      {keranjangData
        ? keranjangData.map((keranjang) => {
            return (
              <div key={keranjang._id} className="mx-5">
                <h1 className="text-lg font-semibold">{keranjang.nama_toko}</h1>
                <p className="text-sm">total harga : {keranjang.total_harga}</p>
                <div className="w-full border border-black my-3" />
                {keranjang.produk.map((produk) => {
                  return <KeranjangCard key={produk._id} keranjang={keranjang} />;
                })}
              </div>
            );
          })
        : null}

      <BottomNavigation />
    </div>
  );
};

export default Keranjang;
