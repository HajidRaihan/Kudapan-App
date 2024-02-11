import { useEffect, useState } from "react";
import { getKeranjang } from "../api/keranjangApi";
import { addOrder } from "../api/orderAPi";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import KeranjangCard from "../components/KeranjangCard";
import KonfirmasiModal from "../components/KonfirmasiModal";
import { DecodeToken } from "../helper/DecodeToken";

const Keranjang = () => {
  const [keranjangData, setKeranjangData] = useState();
  const [totalHarga, setTotalHarga] = useState();
  const [open, setOpen] = useState(false);
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
      console.log(keranjang.list);
      setKeranjangData(keranjang.list);
    };
    getKeranjangUser();
  }, []);

  const addOrderHandler = async () => {
    console.log("testes");
    try {
      const res = await addOrder(userId, 1);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mb-20">
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

      <div className="fixed bottom-3 w-full flex justify-center">
        <button
          className="btn bg-primary w-[350px] text-white btn-error "
          onClick={addOrderHandler}
        >
          Order
        </button>
      </div>

      {open && (
        <KonfirmasiModal
          close={closeHandler}
          title="Apakah anda ingin order pesanan yang ada di keranjang?"
          // handler={}
        />
      )}
      {/* <KonfirmasiModal /> */}
    </div>
  );
};

export default Keranjang;
