import CardTransaksi from "../components/card/CardTransaksi";
import BottomNavigation from "../components/navigation/BottomNavigation";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getHistory } from "../api/historyApi";
import { DecodeToken } from "../helper/DecodeToken";

const History = () => {
  const [historyData, setHistoryData] = useState();
  const token = DecodeToken();
  const userId = token._id;
  useEffect(() => {
    const getAllHistory = async () => {
      const res = await getHistory(userId);
      console.log(res);
      setHistoryData(res);
    };
    getAllHistory();
  }, []);
  return (
    <>
      <div className="mb-20">
        <Header title="Riwayat Transaksi" userId={userId} />

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

                  {history.pesanan.map((toko) => {
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
      </div>
    </>
  );
};

export default History;
