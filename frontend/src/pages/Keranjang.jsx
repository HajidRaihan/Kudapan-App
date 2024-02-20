import { useEffect, useState } from "react";
import { getKeranjang } from "../api/keranjangApi";
import { addOrder } from "../api/orderAPi";
import AlertModal from "../components/AlertModal";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import KeranjangCard from "../components/KeranjangCard";
import KonfirmasiModal from "../components/KonfirmasiModal";
import { DecodeToken } from "../helper/DecodeToken";

const Keranjang = () => {
  const [keranjangData, setKeranjangData] = useState();
  const [totalHarga, setTotalHarga] = useState();
  const [open, setOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const token = DecodeToken();
  const userId = token._id;

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = async () => {
    setOpen(false);
  };

  useEffect(() => {
    const getKeranjangUser = async () => {
      const token = DecodeToken();
      const userId = token._id;
      const keranjang = await getKeranjang(userId);
      console.log(keranjang);
      setKeranjangData(keranjang.list);
    };
    getKeranjangUser();
  }, []);

  const addOrderHandler = async () => {
    console.log("testes");
    try {
      const res = await addOrder(userId, 1);
      console.log(res);

      setAlertModalOpen(true);
      setOpen(false);
      console.log("sukses");
      setTimeout(() => {
        setAlertModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mb-36">
      <Header title="Keranjang" />
      {keranjangData
        ? keranjangData.map((keranjang) => {
            return (
              <div key={keranjang._id} className="mx-5 mb-8">
                <h1 className="text-lg font-semibold">{keranjang.nama_toko}</h1>
                <p className="text-sm">total harga : {keranjang.total_harga}</p>
                <div className="w-full border border-black my-3" />
                {keranjang.produk.map((produk) => {
                  return <KeranjangCard key={produk._id} {...produk} />;
                })}
              </div>
            );
          })
        : null}

      {keranjangData?.length !== 0 ? (
        <div className="fixed bottom-16 w-full flex justify-center">
          <button className="btn bg-primary w-[350px] text-white btn-error " onClick={openHandler}>
            Order
          </button>
        </div>
      ) : null}

      {open && (
        <KonfirmasiModal
          close={closeHandler}
          title="Apakah anda ingin order pesanan yang ada di keranjang?"
          handler={addOrderHandler}
        />
      )}

      {alertModalOpen && (
        <AlertModal title={"Berhasil Mengorder"} close={() => setAlertModalOpen(false)} />
      )}

      {/* <KonfirmasiModal /> */}
      <BottomNavigation />
    </div>
  );
};

export default Keranjang;
