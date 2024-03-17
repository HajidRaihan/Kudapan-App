import { useEffect, useState } from "react";
import { TokenHandler } from "../../helper/TokenHandler";
import { DecodeToken } from "../../helper/DecodeToken";
import { getDetailTokoByUserId } from "../../api/tokoApi";
import NewProdukModals from "../../components/modals/NewProdukModals";
import MenuCardVendor from "../../components/card/MenuCardVendor";
import EditProdukModal from "../../components/modals/EditProdukModal";
import { getDetailProduk } from "../../api/produkApi";

const HomeVendor = () => {
  const [detailToko, setDetailToko] = useState();
  const [editProdukOpen, setEditProdukOpen] = useState(false);
  const [newProdukOpen, setNewProdukOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [produkId, setProdukId] = useState("");
  const [detailProduk, setDetailProduk] = useState();
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

  useEffect(() => {
    const getProdukById = async () => {
      const res = await getDetailProduk(produkId);
      console.log(res);
      setDetailProduk(res);
    };
    getProdukById();
  }, [produkId]);

  const editProdukOpenHandler = (id) => {
    setProdukId(id);
    console.log(id);
    setEditProdukOpen(true);
    // setNewProdukOpen(true);
  };

  const newProdukOpenHandler = () => {
    setNewProdukOpen(true);
  };

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
              return (
                <MenuCardVendor
                  key={data._id}
                  userId={userId}
                  {...data}
                  openEditModal={() => editProdukOpenHandler(data._id)}
                />
              );
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

      {editProdukOpen && (
        <EditProdukModal
          // setNewProdukOpen={() => setNewProdukOpen(true)}
          close={() => setEditProdukOpen(false)}
          userId={userId}
          produkDetail={detailProduk}
        />
      )}

      {/* <div className="flex justify-center">
        <BottomNavigation />
      </div> */}
    </div>
  );
};

export default HomeVendor;
