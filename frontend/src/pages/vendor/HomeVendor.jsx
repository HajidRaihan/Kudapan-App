import CounterCard from "../../components/CounterCard";
import Kategori from "../../components/Kategori";
import BottomNavigation from "../../components/BottomNavigation";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { TokenHandler } from "../../helper/TokenHandler";
import { DecodeToken } from "../../helper/DecodeToken";
import { getAllToko, getDetailTokoByUserId } from "../../api/tokoApi";
import MenuCardVendor from "../../components/MenuCardVendor";
import KeranjangCard from "../../components/KeranjangCard";

const HomeVendor = () => {
  const [detailToko, setDetailToko] = useState();

  useEffect(() => {
    const token = TokenHandler();
    const tokenData = DecodeToken();
    const userId = tokenData._id;

    const getDetailToko = async () => {
      const res = await getDetailTokoByUserId(userId);
      console.log(res);
      setDetailToko(res);
    };
    getDetailToko();
  }, []);
  return (
    <div className="lg:mx-96">
      <h1 className="mx-5 font-bold text-md mt-5">Kamu Login sebagai vendor</h1>
      <SearchBar />
      {/* <Banner title="KUDAPAN APP" /> */}

      <div className="flex gap-1 my-5 mx-5">
        <Kategori title="All" selected={true} />
        <Kategori title="Makanan" />
        <Kategori title="Minuman" />
        <Kategori title="Dessert" />
      </div>
      <div className="mx-5 pb-20">
        {detailToko
          ? detailToko.produk.map((data) => {
              return <MenuCardVendor key={data._id} {...data} />;
            })
          : ""}
      </div>

      <div className="flex justify-center">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default HomeVendor;
