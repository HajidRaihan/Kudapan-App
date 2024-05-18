import CardTransaksi from "../components/card/CardTransaksi";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { deleteHistory, getHistory } from "../api/historyApi";
import { DecodeToken } from "../helper/DecodeToken";
import MainLayout from "../components/layout/MainLayout";
import toast, { Toaster } from "react-hot-toast";
import FormatRupiah from "../helper/FormatRupiah";

const History = () => {
  const [historyData, setHistoryData] = useState();
  const token = DecodeToken();
  const userId = token._id;
  useEffect(() => {
    const getAllHistory = async () => {
      const res = await getHistory(userId);
      console.log(res.data);
      setHistoryData(res.data);
    };
    getAllHistory();
  }, [userId]);

  const deleteHistoryHandler = async () => {
    const response = await deleteHistory(userId);
    if (response) {
      // setOpenModal(true);
      toast.success("Riwayat Berhasil dihapus");
      setHistoryData([]);
      //   window.location.reload();
    }
    console.log(response);
  };
  return (
    <>
      <div className="mb-20">
        <MainLayout>
          <Toaster />
          <Header
            title="Riwayat Transaksi"
            action="Hapus Riwayat"
            userId={userId}
            handler={deleteHistoryHandler}
          />

          {historyData
            ? [...historyData].reverse().map((history) => {
                return (
                  <div className="mb-10 mx-5 mt-5" key={history._id}>
                    <div className="flex justify-between items-end">
                      <h1 className="text-base font-semibold">{history.nama_toko}</h1>
                      <div className="flex gap-3">
                        <div
                          className={`w-24 h-8 text-white text-sm flex justify-center items-center rounded-xl
                    ${
                      history.status === "diterima"
                        ? "bg-primary"
                        : history.status === "diproses"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }
                    `}
                          onClick={() => openHandler(history._id)}
                        >
                          {history.status}
                        </div>
                        <div
                          className={`w-24 h-8 text-white text-sm flex justify-center items-center rounded-xl
                    ${history.status_pembayaran === "belum lunas" ? "bg-primary" : "bg-green-500"}
                    `}
                          onClick={() => openHandler(history._id)}
                        >
                          {history.status_pembayaran}
                        </div>
                      </div>
                    </div>

                    <div className="w-full border border-black my-2" />
                    <div className="mb-5">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs">Meja : {history.meja}</p>
                          <p className="text-xs">
                            total harga : <FormatRupiah value={history.total_harga} />
                          </p>
                        </div>
                      </div>

                      {history.pesanan.map((produk) => {
                        return <CardTransaksi key={produk._id} {...produk} />;
                      })}
                    </div>

                    {/* {history.pesanan.map((toko, index) => {
                      return (
                        <div className="mb-5" key={index}>
                          <div className="flex justify-between items-center">
                            <div>
                              <h1 className="text-base font-semibold">{toko.nama_toko}</h1>
                              <p className="text-xs">
                                total harga : <FormatRupiah value={toko.total_harga} />
                              </p>
                            </div>
                            <div className="w-24 h-8 bg-primary text-white text-sm flex justify-center items-center rounded-xl">
                              {toko.status}
                            </div>
                          </div>

                          {toko.produk.map((produk) => {
                            return <CardTransaksi key={produk._id} {...produk} />;
                          })}
                        </div>
                      );
                    })} */}
                  </div>
                );
              })
            : ""}
        </MainLayout>
      </div>
    </>
  );
};

export default History;
