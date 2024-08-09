import { useEffect, useState } from "react";
import {
  clearKeranjang,
  deleteProdukKeranjang,
  getKeranjang,
  increaseProdukKeranjang,
} from "../api/keranjangApi";
import { addOrder } from "../api/orderAPi";
import AlertModal from "../components/AlertModal";
import Header from "../components/Header";
import KeranjangCard from "../components/KeranjangCard";
import KonfirmasiModal from "../components/KonfirmasiModal";
import { DecodeToken } from "../helper/DecodeToken";
import MainLayout from "../components/layout/MainLayout";
import toast, { Toaster } from "react-hot-toast";
import FormatRupiah from "../helper/FormatRupiah";
import { decrypt } from "../helper/Encrypt";
import Cookies from "js-cookie";
import OrderDineInModal from "../components/modals/OrderDineInModal";
import CounterCardSkeleton from "../components/skeleton/CounterCardSkeleton";
import Loader from "../components/Loader";

const Keranjang = () => {
  const [keranjangData, setKeranjangData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dineInModalOpen, setDineInModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [meja, setMeja] = useState();
  const [jenisLayanan, setJenisLayanan] = useState("");

  const token = DecodeToken();
  const userId = token._id;

  const openHandler = (layanan) => {
    setJenisLayanan(layanan);
    setOpen(true);
  };
  const closeHandler = async () => {
    setOpen(false);
  };
  useEffect(() => {
    const getKeranjangUser = async () => {
      setIsLoading(true); // Set loading true sebelum fetch data
      try {
        const token = DecodeToken();
        const userId = token._id;
        const keranjang = await getKeranjang(userId);
        setKeranjangData(keranjang);
      } catch (error) {
        console.error("Error fetching keranjang:", error);
      } finally {
        setIsLoading(false); // Set loading false setelah data di-fetch
      }
    };
    getKeranjangUser();
  }, []);

  const addOrderHandler = async () => {
    console.log("testes");
    // const dataMeja = Cookies.get("meja");

    // const mejaDecrypt = decrypt(dataMeja);

    // console.log({ mejaDecrypt });

    // if (mejaDecrypt === "") {
    //   return alert("Nomor Meja tidak valid, silahkan scan ulang QR Code");
    // }

    // return console.log({ meja });

    try {
      const res = await addOrder(userId, meja, { jenis_layanan: jenisLayanan });
      if (res) {
        toast.success("Berhasil Melakukan Order");

        // setAlertModalOpen(true);
        setKeranjangData([]);
        setOpen(false);
        setDineInModalOpen(false);
        console.log("sukses");
      }
      // toast.error("gagal melakukan order");
    } catch (error) {
      toast.error("gagal melakukan order " + error.response.data.error);
      console.error("error", error);
      setOpen(false);
    }
  };

  const deleteProdukKeranjangHandler = async (keranjangIndex, produkIndex) => {
    const res = await deleteProdukKeranjang(keranjangIndex, produkIndex, userId);
    console.log(res);
    const updatedKeranjangData = [...keranjangData];

    const keranjang = updatedKeranjangData[keranjangIndex];

    keranjang.produk[produkIndex].jumlah -= 1;
    keranjang.total_harga -= keranjang.produk[produkIndex].harga;
    keranjang.produk[produkIndex].total -= keranjang.produk[produkIndex].harga;

    if (keranjang.produk[produkIndex].jumlah === 0) {
      keranjang.produk.splice(produkIndex, 1);
    }
    if (keranjang.produk.length === 0) {
      updatedKeranjangData.splice(keranjangIndex, 1);
    }

    setKeranjangData(updatedKeranjangData);
  };

  const increaseProdukKeranjangHandler = async (keranjangIndex, produkIndex) => {
    const res = await increaseProdukKeranjang(keranjangIndex, produkIndex, userId);
    console.log(res);
    console.log("clicked");
    const updatedKeranjangData = [...keranjangData];

    const keranjang = updatedKeranjangData[keranjangIndex];

    keranjang.produk[produkIndex].jumlah += 1;
    keranjang.total_harga += keranjang.produk[produkIndex].harga;
    keranjang.produk[produkIndex].total += keranjang.produk[produkIndex].harga;

    setKeranjangData(updatedKeranjangData);
  };

  const clearKeranjangHandler = async () => {
    const res = await clearKeranjang(userId);
    console.log(res);
    toast.success("Keranjang Berhasil dihapus");
    setKeranjangData([]);
  };

  const mejaHandler = (e) => {
    setMeja(e.target.value);
    console.log(e.target.value);
  };

  const dineInModalHandler = (layanan) => {
    setJenisLayanan(layanan);
    setDineInModalOpen(true);
  };

  return (
    <div className="mb-36">
      <MainLayout>
        <Toaster />
        <Header title="Keranjang" action="Hapus Keranjang" handler={clearKeranjangHandler} />
        {isLoading ? (
          <Loader />
        ) : keranjangData.length === 0 ? (
          <div className="mx-5 font-medium">
            <p>Keranjangmu masih kosong!</p>
          </div>
        ) : (
          <>
            {keranjangData.map((keranjang) => {
              return (
                <div key={keranjang._id} className="mx-5 mb-5 border p-3 rounded-lg shadow-lg">
                  <h1 className="text-lg font-semibold">{keranjang.nama_toko}</h1>
                  <p className="text-sm">
                    total harga : <FormatRupiah value={keranjang.total_harga} />
                  </p>
                  <div className="w-full border border-black my-3" />
                  {keranjang.produk.map((produk) => {
                    return (
                      <KeranjangCard
                        key={produk._id}
                        produkIndex={keranjang.produk.indexOf(produk)}
                        keranjangIndex={keranjangData.indexOf(keranjang)}
                        deleteProdukKeranjangHandler={deleteProdukKeranjangHandler}
                        increaseProdukKeranjangHandler={increaseProdukKeranjangHandler}
                        {...produk}
                      />
                    );
                  })}
                </div>
              );
            })}
            <div className=" bottom-16 w-full ">
              <div className="mx-7 flex justify-center gap-5">
                <button
                  className="btn bg-primary w-1/2 text-white btn-error "
                  onClick={() => dineInModalHandler("dine in")}
                >
                  Dine In
                </button>
                <button
                  className="btn bg-warning w-1/2 text-white btn-warning "
                  onClick={() => openHandler("take away")}
                >
                  Take Away
                </button>
              </div>
            </div>
          </>
        )}
      </MainLayout>
      {/* {keranjangData?.length !== 0 ? (
        <div className="fixed bottom-16 w-full flex justify-center">
          <button className="btn bg-primary w-[350px] text-white btn-error " onClick={openHandler}>
            Order
          </button>
        </div>
      ) : null} */}

      {open && (
        <KonfirmasiModal
          close={closeHandler}
          title="Apakah anda ingin order pesanan yang ada di keranjang?"
          handler={addOrderHandler}
          action="Order"
        />
      )}
      {dineInModalOpen && (
        <OrderDineInModal
          onChange={mejaHandler}
          meja={meja}
          handler={addOrderHandler}
          close={() => setDineInModalOpen(false)}
        />
      )}

      {alertModalOpen && (
        <AlertModal
          title={"Berhasil Mengorder"}
          close={() => {
            setAlertModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Keranjang;
