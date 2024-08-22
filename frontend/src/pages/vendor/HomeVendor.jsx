import { useEffect, useState } from "react";
import { TokenHandler } from "../../helper/TokenHandler";
import { DecodeToken } from "../../helper/DecodeToken";
import { getDetailTokoByUserId } from "../../api/tokoApi";
import NewProdukModals from "../../components/modals/NewProdukModals";
import MenuCardVendor from "../../components/card/MenuCardVendor";
import EditProdukModal from "../../components/modals/EditProdukModal";
import { getDetailProduk } from "../../api/produkApi";
import toast, { Toaster } from "react-hot-toast";
import VendorLayout from "../../components/layout/VendorLayout";
import FormatRupiah from "../../helper/FormatRupiah";
import { Money } from "@styled-icons/boxicons-regular/Money";
import { styled } from "styled-components";
import { getUserById, getVendorById } from "../../api/userApi";
import Loader from "../../components/Loader";
import CounterCardSkeleton from "../../components/skeleton/CounterCardSkeleton";

const StyledMoney = styled(Money)`
  color: #105a37;
  width: 20px;
`;

const HomeVendor = () => {
  const [detailToko, setDetailToko] = useState();
  const [userId, setUserId] = useState();
  const [userDetail, setUserDetail] = useState();
  const [editProdukOpen, setEditProdukOpen] = useState(false);
  const [newProdukOpen, setNewProdukOpen] = useState(false);

  const [produkId, setProdukId] = useState("");
  const [detailProduk, setDetailProduk] = useState();
  const token = TokenHandler();

  useEffect(() => {
    const tokenData = DecodeToken();
    console.log({ tokenData });
    console.log(tokenData._id);
    setUserId(tokenData._id);
  }, []);

  useEffect(() => {
    const getDetailUser = async () => {
      try {
        const res = await getVendorById(userId);
        setUserDetail(res);
      } catch (error) {
        console.error("Gagal mendapatkan detail user:", error);
      }
    };
    if (userId) {
      getDetailUser();
    }
  }, [userId]);

  useEffect(() => {
    const getDetailToko = async () => {
      try {
        const res = await getDetailTokoByUserId(userId);
        console.log(res);
        setDetailToko(res);
      } catch (error) {
        console.error("Gagal mendapatkan detail toko:", error);
      }
    };
    if (userId) {
      getDetailToko();
    }
  }, [userId]);

  useEffect(() => {
    const getProdukById = async () => {
      if (produkId) {
        const res = await getDetailProduk(produkId);
        console.log(res);
        setDetailProduk(res);
      }
    };
    getProdukById();
  }, [produkId]);

  const editProdukOpenHandler = (id) => {
    setProdukId(id);
    console.log(id);
    setEditProdukOpen(true);
    // setNewProdukOpen(true);
  };

  return (
    <div className="lg:flex flex-col items-center relative">
      <VendorLayout>
        <div className="lg:w-[700px]">
          <Toaster />

          <div className="mx-5 mt-3">
            <div className="flex justify-between items-center ">
              <div>
                <h1 className="font-bold text-md">{detailToko?.nama}.</h1>
                <h1 className="text-[10px]">anda login sebagai vendor</h1>
                {userDetail && (
                  <div className="text-sm flex items-center gap-1">
                    <StyledMoney />
                    {/* <p>Rp. {userDetail.saldo}</p> */}
                    <p className="text-xs">
                      <FormatRupiah value={userDetail.saldo} />
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-0.5 bg-black" />
          </div>

          {/* <div className="mx-5">
            <h1 className="font-bold text-md mt-5 mb-1">{detailToko?.nama}</h1>
            <div className="w-full h-0.5 bg-black" />
          </div> */}
          {/* <SearchBar /> */}
          {/* <Banner title="KUDAPAN APP" /> */}

          {/* <div className="flex gap-1 my-5 mx-5">
        <Kategori title="All" selected={true} />
        <Kategori title="Makanan" />
        <Kategori title="Minuman" />
        <Kategori title="Dessert" />
      </div> */}
          <div className="mx-5 pb-32">
            {detailToko ? (
              detailToko.produk.map((data) => {
                return (
                  <MenuCardVendor
                    key={data._id}
                    userId={userDetail?._id}
                    setDetailToko={setDetailToko}
                    {...data}
                    openEditModal={() => {
                      setProdukId(data._id); // Set the produkId
                      setEditProdukOpen(true); // Open the modal
                    }}
                  />
                );
              })
            ) : (
              <div className="mt-5">
                <CounterCardSkeleton />
                <CounterCardSkeleton />
                <CounterCardSkeleton />
              </div>
            )}
          </div>

          {/* <div className=""> */}
          {/* <button
          className="btn btn-info text-white fixed bottom-3"
          onClick={() => {
            setNewProdukOpen(true);
            console.log(newProdukOpen);
          }}
        >
          Tambah Produk
        </button> */}
          {/* </div> */}

          <div className="fixed bottom-14 left-1/2 transform -translate-x-1/2">
            {" "}
            {/* Updated line */}
            <button
              className="btn btn-success text-white w-40 text-xs"
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
              isSuccess={() => toast.success("Berhasil Menambahkan Produk")}
              isError={(message) => toast.error(message)}
              setDetailToko={setDetailToko}
            />
          )}

          {editProdukOpen && (
            <EditProdukModal
              // setNewProdukOpen={() => setNewProdukOpen(true)}
              close={() => setEditProdukOpen(false)}
              userId={userId}
              produk={detailProduk}
              isSuccess={() => toast.success("Berhasil Mengedit Produk")}
              isError={(message) => toast.error(message)}
              setDetailToko={setDetailToko}
            />
          )}

          {/* <div className="flex justify-center">
        <BottomNavigation />
      </div> */}
        </div>
      </VendorLayout>
    </div>
  );
};

export default HomeVendor;
