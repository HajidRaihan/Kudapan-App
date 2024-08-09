import CardTransaksi from "../components/card/CardTransaksi";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getHistory } from "../api/historyApi";
import { DecodeToken } from "../helper/DecodeToken";
import MainLayout from "../components/layout/MainLayout";
import toast, { Toaster } from "react-hot-toast";
import FormatRupiah from "../helper/FormatRupiah";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("menunggu");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const token = DecodeToken();
  const userId = token._id;

  const listStatus = ["menunggu", "diterima", "diproses", "selesai", "ditolak"];

  const statusSelectedHandler = (status) => {
    setSelectedStatus(status);
    setPage(1);
    setHistoryData([]);
    setHasMore(true);
  };

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await getHistory(userId, selectedStatus, page);
      console.log(res);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setHistoryData((prevData) => [...prevData, ...res.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to fetch history data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [userId, selectedStatus]);

  return (
    <MainLayout>
      <Toaster />

      <div className="mb-20">
        <div className="relative">
          <div className="mx-5 absolute z-50 mt-1">
            <BackButton />
          </div>
          <h1 className="text-xl font-bold text-center my-5">Riwayat Transaksi</h1>
        </div>

        <div className="flex gap-1 mx-2">
          {listStatus.map((data) => (
            <Status
              key={data}
              handler={() => statusSelectedHandler(data)}
              selected={data === selectedStatus}
              value={data}
            />
          ))}
        </div>

        {isLoading && page === 1 ? (
          <Loader />
        ) : (
          <InfiniteScroll
            dataLength={historyData.length}
            next={fetchHistory}
            hasMore={hasMore}
            loader={<LoadingKomponen />}
            // endMessage={<p className="text-center">Semua data sudah ditampilkan.</p>}
          >
            {historyData.length === 0 && !isLoading ? (
              <div className="mx-5 mt-2 font-medium">
                <p className="text-center">Belum ada pesanan</p>
              </div>
            ) : (
              historyData.map((history) => (
                <div className="mb-5 mx-5 mt-5 border p-3 shadow-lg rounded-lg" key={history._id}>
                  <div className="flex justify-between items-end">
                    <h1 className="text-base font-semibold">{history.nama_toko}</h1>
                    <div className="flex gap-3">
                      <div
                        className={`w-24 h-8 text-white text-xs flex justify-center items-center rounded-xl ${
                          history.status_pembayaran === "belum lunas"
                            ? "bg-primary"
                            : "bg-green-500"
                        }`}
                      >
                        {history.status_pembayaran === "lunas" ? "dibayar" : "belum bayar"}
                      </div>
                    </div>
                  </div>

                  <div className="w-full border border-black my-2" />
                  <div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs">Jenis Layanan : {history.jenis_layanan}</p>
                        {history.meja !== 0 && <p className="text-xs">Meja : {history.meja}</p>}
                        <p className="text-xs">
                          total harga : <FormatRupiah value={history.total_harga} />
                        </p>
                      </div>
                    </div>

                    {history.pesanan.map((produk) => (
                      <CardTransaksi key={produk._id} {...produk} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </InfiniteScroll>
        )}
      </div>
    </MainLayout>
  );
};

const Status = ({ handler, selected, value }) => (
  <div
    className={`py-2 ${
      value === "menunggu" ? "text-[10px]" : "text-xs"
    } w-20 flex justify-center border rounded-xl cursor-pointer ${
      selected && "bg-primary text-white"
    }`}
    onClick={handler}
  >
    {value}
  </div>
);

const LoadingKomponen = () => {
  return (
    <div className="flex w-full justify-center">
      <span className="loading loading-dots loading-md text-error"></span>
    </div>
  );
};

export default History;
