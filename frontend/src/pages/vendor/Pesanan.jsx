import React, { useEffect, useState } from "react";
import { changeStatusOrder, deleteRiwayatPesanan, getPesanan } from "../../api/pesananApi";
import CardTransaksi from "../../components/card/CardTransaksi";
import { DecodeToken } from "../../helper/DecodeToken";
import { formatDistanceToNow } from "date-fns";
import TimeAgo from "../../helper/TimeAgo";
import ChangeStatusOrderModal from "../../components/modals/ChangeStatusOrderModal";
import VendorLayout from "../../components/layout/VendorLayout";
import Header from "../../components/Header";
import toast, { Toaster } from "react-hot-toast";

const Pesanan = () => {
  const [userId, setUserId] = useState();
  const [orderId, setOrderId] = useState();
  const [pesananData, setPesananData] = useState();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();

  useState(() => {
    const token = DecodeToken();
    setUserId(token._id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Panggil getPesanan sekali saat komponen dimount
        const initialPesanan = await getPesanan(userId);
        setPesananData(initialPesanan);
      } catch (error) {
        console.error("Gagal memuat data pesanan:", error);
      }

      // Set interval untuk pemanggilan berikutnya setelah 5 detik
      const interval = setInterval(async () => {
        try {
          const res = await getPesanan(userId);
          // console.log(res);
          setPesananData(res);
        } catch (error) {
          console.error("Gagal memuat data pesanan:", error);
        }
      }, 5000); // 5000 milidetik = 5 detik

      // Membersihkan interval setelah komponen unmount
      return () => clearInterval(interval);
    };

    // Panggil fetchData sekali saat komponen dimount
    fetchData();
  }, []);

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
                <div className="flex justify-between items-denter">
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
                  <p className="text-sm font-bold">Meja {pesanan.meja}</p>
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

                <p className="text-xs">Pemesan : {pesanan.pemesan}</p>
                <p className="text-xs">Email pemesan : {pesanan.email_pemesan}</p>
                {/* <p className="text-xs">Waktu pemesanan : {pesanan.waktu_pemesanan}</p> */}
                <p className="text-xs">Total harga : {pesanan.total_harga}</p>
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
