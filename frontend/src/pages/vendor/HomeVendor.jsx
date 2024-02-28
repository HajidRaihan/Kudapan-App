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
import NewProdukModals from "../../components/modals/NewProdukModals";

const HomeVendor = () => {
  const [detailToko, setDetailToko] = useState();
  const [editProdukOpen, setEditProdukOpen] = useState(false);
  const [newProdukOpen, setNewProdukOpen] = useState(false);
  const token = TokenHandler();
  const tokenData = DecodeToken();
  const userId = tokenData._id;

  useEffect(() => {
    const getDetailToko = async () => {
      const res = await getDetailTokoByUserId(userId);
      console.log(res);
      setDetailToko(res);
    };
    getDetailToko();
  }, []);

  return (
    <div className="lg:mx-96">
      <div className="mx-5">
        <h1 className="font-bold text-md mt-5 mb-1">{detailToko?.nama}</h1>
        <div className="w-full h-0.5 bg-black" />
      </div>
      {/* <SearchBar /> */}
      {/* <Banner title="KUDAPAN APP" /> */}

      {/* <div className="flex gap-1 my-5 mx-5">
        <Kategori title="All" selected={true} />
        <Kategori title="Makanan" />
        <Kategori title="Minuman" />
        <Kategori title="Dessert" />
      </div> */}
      <div className="mx-5 pb-20">
        {detailToko
          ? detailToko.produk.map((data) => {
              return <MenuCardVendor key={data._id} {...data} />;
            })
          : ""}
      </div>

      <div className="fixed bottom-3 w-full flex justify-center">
        <button
          className="btn btn-info text-white"
          onClick={() => {
            setNewProdukOpen(true);
            console.log(newProdukOpen);
          }}
        >
          Tambah Produk
        </button>
      </div>

      {newProdukOpen && (
        <NewProdukModals
          // setNewProdukOpen={() => setNewProdukOpen(true)}
          close={() => setNewProdukOpen(false)}
          userId={userId}
        />
      )}

      {/* <div className="flex justify-center">
        <BottomNavigation />
      </div> */}
    </div>
  );
};

export default HomeVendor;
