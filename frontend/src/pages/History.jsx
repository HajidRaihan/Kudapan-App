import CardTransaksi from "../components/CardTransaksi";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getHistory } from "../api/historyApi";
import { DecodeToken } from "../helper/DecodeToken";

const History = () => {
  const [historyData, setHistoryData] = useState();
  useEffect(() => {
    const getAllHistory = async () => {
      const token = DecodeToken();
      const userId = token._id;
      const res = await getHistory(userId);
      console.log(res);
      setHistoryData(res);
    };
    getAllHistory();
  }, []);
  return (
    <>
      <div className="mb-20">
        <Header title="Riwayat Transaksi" />

        {historyData
          ? [...historyData].reverse().map((history) => {
              return (
                <div className="mb-10 mx-5 mt-5" key={history._id}>
                  <div className="flex justify-between items-denter">
                    <div className="w-24 h-8 bg-primary text-white text-sm flex justify-center items-center rounded-xl">
                      {history.status}
                    </div>
                    <p className="text-sm font-bold">Meja {history.meja}</p>
                  </div>

                  <div className="w-full border border-black my-3" />

                  {history.pesanan[0].list.map((toko) => {
                    return (
                      <div className="mb-5">
                        <h1 className="text-base font-semibold">{toko.nama_toko}</h1>
                        <p className="text-xs">total harga : {toko.total_harga}</p>

                        {toko.produk.map((produk) => {
                          return <CardTransaksi key={produk._id} {...produk} />;
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })
          : ""}

        <BottomNavigation />

        {/* <KonfirmasiModal /> */}
      </div>
    </>
  );
};

export default History;
