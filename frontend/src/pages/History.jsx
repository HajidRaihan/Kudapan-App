import CardTransaksi from "../components/card/CardTransaksi";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { deleteHistory, getHistory } from "../api/historyApi";
import { DecodeToken } from "../helper/DecodeToken";
import MainLayout from "../components/layout/MainLayout";
import toast, { Toaster } from "react-hot-toast";
import FormatRupiah from "../helper/FormatRupiah";
import BackButton from "../components/BackButton";

const History = () => {
  const [historyData, setHistoryData] = useState();
  const [selectedStatus, setSelectedStatus] = useState("menunggu");
  const token = DecodeToken();
  const userId = token._id;

  const listStatus = ["menunggu", "diterima", "diproses", "selesai", "ditolak"];

  const statusSelectedHandler = (status) => {
    setSelectedStatus(status);
    console.log(status);
  };

  useEffect(() => {
    const getAllHistory = async () => {
      const res = await getHistory(userId, selectedStatus);
      console.log(res.data);
      setHistoryData(res.data);
    };
    getAllHistory();
  }, [userId, selectedStatus]);

  // const deleteHistoryHandler = async () => {
  //   const response = await deleteHistory(userId);
  //   if (response) {
  //     // setOpenModal(true);
  //     toast.success("Riwayat Berhasil dihapus");
  //     setHistoryData([]);
  //     //   window.location.reload();
  //   }
  //   console.log(response);
  // };

  return (
    <>
      <div className="mb-20">
        <MainLayout>
          <Toaster />

          <div>
            <div className="relative">
              <div className="mx-5 absolute z-50 mt-1">
                <BackButton />
              </div>
              {/* <Banner title="Nasi Goreng Masuli" /> */}

              <h1 className="text-xl font-bold text-center my-5">Riwayat Transaksi</h1>
              {/* <img src={MenuIcon} alt="" className="absolute top-0 right-5" /> */}
              {/* <div className="absolute -top-3 right-5">
            <MenuDropdown userId={userId} />
          </div> */}
            </div>
          </div>

          <div className="flex gap-1 mx-2">
            {listStatus.map((data) => {
              return (
                <Status
                  key={data}
                  handler={() => statusSelectedHandler(data)}
                  listStatus={listStatus}
                  selected={data === selectedStatus}
                  value={data}
                />
              );
            })}
          </div>

          {historyData
            ? [...historyData].reverse().map((history) => {
                return (
                  <div className="mb-5 mx-5 mt-5 border p-3 shadow-lg rounded-lg" key={history._id}>
                    <div className="flex justify-between items-end">
                      <h1 className="text-base font-semibold">{history.nama_toko}</h1>
                      <div className="flex gap-3">
                        {/* <div
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
                        </div> */}
                        <div
                          className={`w-24 h-8 text-white text-xs flex justify-center items-center rounded-xl
                            ${
                              history.status_pembayaran === "belum lunas"
                                ? "bg-primary"
                                : "bg-green-500"
                            }
                            `}
                        >
                          {history.status_pembayaran === "lunas" ? "dibayar" : "belum bayar"}
                        </div>
                      </div>
                    </div>

                    <div className="w-full border border-black my-2" />
                    <div className="">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs">Jenis Layanan : {history.jenis_layanan}</p>
                          {history.meja !== 0 && <p className="text-xs">Meja : {history.meja}</p>}
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

const Status = ({ handler, selected, value }) => {
  return (
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
};

export default History;
