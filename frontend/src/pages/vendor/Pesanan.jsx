import { useEffect, useState } from "react";
import { changeStatusOrder, deleteRiwayatPesanan, getPesanan } from "../../api/pesananApi";
import CardTransaksi from "../../components/card/CardTransaksi";
import { DecodeToken } from "../../helper/DecodeToken";
import TimeAgo from "../../helper/TimeAgo";
import ChangeStatusOrderModal from "../../components/modals/ChangeStatusOrderModal";
import VendorLayout from "../../components/layout/VendorLayout";
import Header from "../../components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ArroRightIcon from "../../assets/icon/arrow-right.svg";

const Pesanan = () => {
  const token = DecodeToken();
  const [userId, setUserId] = useState();
  const [orderId, setOrderId] = useState();
  const [pesananData, setPesananData] = useState();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();

  const navigate = useNavigate();

  useState(() => {
    setUserId(token._id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Panggil getPesanan sekali saat komponen dimount
        const initialPesanan = await getPesanan(userId);
        // console.log({ initialPesanan });
        setPesananData(initialPesanan.data);
      } catch (error) {
        console.error("Gagal memuat data pesanan:", error);
      }

      // Set interval untuk pemanggilan berikutnya setelah 5 detik
      const interval = setInterval(async () => {
        try {
          const res = await getPesanan(userId);
          console.log(res.data);
          setPesananData(res.data);
        } catch (error) {
          console.error("Gagal memuat data pesanan:", error);
        }
      }, 5000); // 5000 milidetik = 5 detik

      // Membersihkan interval setelah komponen unmount
      return () => clearInterval(interval);
    };

    // Panggil fetchData sekali saat komponen dimount
    fetchData();
  }, [userId]);

  const changeStatusOrderHandler = async () => {
    console.log({ status });
    const data = {
      status: status,
    };
    try {
      const res = await changeStatusOrder(userId, orderId, data);
      console.log({ res });
      setOpen(false);
      toast.success("berhasil mengubah status pesanan");
      if (res) {
        setPesananData((prevPesananData) => {
          // Buat salinan baru dari pesananData
          const updatedPesananData = [...prevPesananData];

          // Temukan pesanan yang sesuai berdasarkan orderId
          const pesananToUpdate = updatedPesananData.find((pesanan) => pesanan._id === orderId);

          console.log({ pesananToUpdate });

          // Jika pesanan ditemukan, perbarui statusnya
          if (pesananToUpdate) {
            pesananToUpdate.status = status;
          }

          return updatedPesananData;
        });
      }
    } catch (error) {
      console.error("Gagal mengubah status pesanan:", error);
      toast.error("Gagal mengubah status pesanan");
    }
  };

  const deleteRiwayatHandler = async () => {
    try {
      const res = await deleteRiwayatPesanan(userId);
      console.log({ res });
    } catch (error) {
      console.log(error);
    }
  };

  const openHandler = (id) => {
    setOpen(true);
    setOrderId(id);
    console.log(id);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  const statusOnChange = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="mb-20">
      <VendorLayout>
        <Toaster />
        <Header title="Pesanan" handler={deleteRiwayatHandler} />
        {pesananData ? (
          [...pesananData].reverse().map((pesanan) => {
            return (
              <div className="mb-10 mx-5 mt-5" key={pesanan._id}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <button
                      className={`w-24 h-8 text-white text-sm flex justify-center items-center rounded-xl
                    ${
                      pesanan.status === "diterima"
                        ? "bg-primary"
                        : pesanan.status === "diproses"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }
                    `}
                      onClick={() => openHandler(pesanan._id)}
                    >
                      {pesanan.status}
                    </button>
                    <div
                      className={`w-24 h-8 text-white text-sm flex justify-center items-center rounded-xl
                    ${pesanan.status_pembayaran === "belum lunas" ? "bg-primary" : "bg-green-500"}
                    `}
                    >
                      {pesanan.status_pembayaran}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`${pesanan._id}/${pesanan.pemesan}`)}
                    className="w-24 h-8 bg-slate-400 text-sm flex justify-center gap-3 items-center rounded-xl"
                  >
                    <p>Detail</p>
                    <img src={ArroRightIcon} alt="" className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-full border border-black my-3" />

                {/* {pesanan.pesanan.map((toko) => {
                  return (
                    <div className="mb-5">
                      <h1 className="text-base font-semibold">{toko.nama}</h1>
                      <p className="text-xs">total harga : {toko.harga}</p>

                      {toko.produk.map((produk) => {
                        return <CardTransaksi key={produk._id} {...produk} />;
                      })}
                    </div>
                  );
                })} */}

                <p className="text-xs">Pemesan : {pesanan.user_pemesan.nama}</p>
                <p className="text-xs">Email pemesan : {pesanan.user_pemesan.email}</p>
                {/* <p className="text-xs">Waktu pemesanan : {pesanan.waktu_pemesanan}</p> */}
                <p className="text-xs">Total harga : {pesanan.total_harga}</p>
                <p className="text-xs">Meja : {pesanan.meja}</p>

                <p className="text-xs">
                  <TimeAgo timestamp={pesanan.waktu_pemesanan} />
                </p>

                {pesanan.pesanan.map((produk) => {
                  return <CardTransaksi key={produk._id} {...produk} />;
                })}
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}

        {open && (
          <ChangeStatusOrderModal
            close={closeHandler}
            handler={changeStatusOrderHandler}
            value={status}
            onChange={statusOnChange}
          />
        )}
      </VendorLayout>
    </div>
  );
};

export default Pesanan;
