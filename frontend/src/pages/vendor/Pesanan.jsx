import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  changeStatusOrder,
  deleteRiwayatPesanan,
  getPesanan,
  getPesananToday,
} from "../../api/pesananApi";
import CardTransaksi from "../../components/card/CardTransaksi";
import { DecodeToken } from "../../helper/DecodeToken";
import TimeAgo from "../../helper/TimeAgo";
import ChangeStatusOrderModal from "../../components/modals/ChangeStatusOrderModal";
import VendorLayout from "../../components/layout/VendorLayout";
import Header from "../../components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ArroRightIcon from "../../assets/icon/arrow-right.svg";
import KonfirmasiModal from "../../components/KonfirmasiModal";
import Loader from "../../components/Loader";

const Pesanan = () => {
  const token = DecodeToken();
  const [userId, setUserId] = useState();
  const [orderId, setOrderId] = useState();
  const [pesananData, setPesananData] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [pesananId, setPesananId] = useState();
  const [konfirmasiModalOpen, setKonfirmasiModalOpen] = useState(false);
  const [isToday, setIsToday] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [kategori, setKategori] = useState("Hari ini");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useState(() => {
    setUserId(token._id);
  }, []);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        if (isToday) {
          const initialPesanan = await getPesananToday(userId);
          setPesananData(initialPesanan.data);
        } else {
          const initialPesanan = await getPesanan(userId, 1); // memuat halaman pertama
          setPesananData(initialPesanan.data);
        }
      } catch (error) {
        console.error("Gagal memuat data pesanan:", error);
      } finally {
        setIsLoadingData(false);
      }

      if (isToday) {
        interval = setInterval(async () => {
          try {
            const res = await getPesananToday(userId);
            setPesananData(res.data);
          } catch (error) {
            console.error("Gagal memuat data pesanan:", error);
          }
        }, 5000);
      }
    };

    fetchData();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [userId, isToday]);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const res = await getPesanan(userId, nextPage); // memuat halaman berikutnya
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setPesananData((prevPesananData) => [...prevPesananData, ...res.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Gagal memuat data lebih lanjut:", error);
    }
  };

  const changeStatusOrderHandler = async () => {
    console.log({ status });
    const data = {
      status: status,
    };
    setIsLoading(true);
    try {
      const res = await changeStatusOrder(userId, orderId, data);
      console.log({ res });
      setOpen(false);
      toast.success("berhasil mengubah status pesanan");
      if (res) {
        setIsLoading(false);
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
        console.log("pesanan data", pesananData);
      }
    } catch (error) {
      console.error("Gagal mengubah status pesanan:", error);
      toast.error("Gagal mengubah status pesanan");
      setIsLoading(false);
    }
  };

  const konfirmasiOrderHandler = async (konfirStatus, orderId) => {
    const data = {
      status: konfirStatus,
    };

    console.log(data);
    setIsLoading(true);
    try {
      const res = await changeStatusOrder(userId, orderId, { status: konfirStatus });
      console.log({ res });
      setOpen(false);
      toast.success("berhasil mengubah status pesanan");
      if (res) {
        setIsLoading(false);

        setPesananData((prevPesananData) => {
          // Buat salinan baru dari pesananData
          const updatedPesananData = [...prevPesananData];

          // Temukan pesanan yang sesuai berdasarkan orderId
          const pesananToUpdate = updatedPesananData.find((pesanan) => pesanan._id === orderId);

          console.log({ pesananToUpdate });

          // Jika pesanan ditemukan, perbarui statusnya
          if (pesananToUpdate) {
            pesananToUpdate.status = konfirStatus;
          }

          return updatedPesananData;
        });
        setKonfirmasiModalOpen(false);
      }
    } catch (error) {
      setIsLoading(false);

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

  const konfirmasiModalOpenHandler = (pesananId) => {
    setKonfirmasiModalOpen(true);
    setPesananId(pesananId);
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

  const closeKonfirmasiModalHandler = () => {
    console.log("klikk");
  };

  const changeKategoriHandler = (kategori) => {
    setKategori(kategori);
    if (kategori === "Hari ini") {
      setIsToday(true);
      setPesananData([]);
    }
    if (kategori === "Semua") {
      setIsToday(false);
      setPesananData([]);
      setPage(1);
      setHasMore(true);
    }
  };

  const kategoriData = ["Hari ini", "Semua"];

  return (
    <div className="mb-20">
      <VendorLayout>
        <Toaster />
        <Header title="Pesanan" handler={deleteRiwayatHandler} />
        <div className="mx-5 gap-3 flex">
          {kategoriData?.map((data) => (
            <KategoriKomponen
              key={data}
              title={data}
              handler={() => changeKategoriHandler(data)}
              selected={data === kategori}
            />
          ))}
        </div>

        {!isLoadingData ? (
          isToday ? (
            pesananData.map((pesanan) => (
              <PesananCard
                key={pesanan._id}
                pesanan={pesanan}
                konfirmasiOrderHandler={konfirmasiOrderHandler}
                konfirmasiModalOpenHandler={konfirmasiModalOpenHandler}
                openHandler={openHandler}
                isLoading={isLoading}
                navigate={navigate}
              />
            ))
          ) : (
            <InfiniteScroll
              dataLength={pesananData.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<LoadingKomponen />}
            >
              {pesananData.map((pesanan) => (
                <PesananCard
                  key={pesanan._id}
                  pesanan={pesanan}
                  konfirmasiOrderHandler={konfirmasiOrderHandler}
                  konfirmasiModalOpenHandler={konfirmasiModalOpenHandler}
                  openHandler={openHandler}
                  isLoading={isLoading}
                  navigate={navigate}
                />
              ))}
            </InfiniteScroll>
          )
        ) : (
          <Loader />
        )}

        {konfirmasiModalOpen && (
          <KonfirmasiModal
            title={"Apakah anda ingin menolak pesanan ini?"}
            action={"Tolak"}
            handler={() => konfirmasiOrderHandler("ditolak", pesananId)}
            close={() => setKonfirmasiModalOpen(false)}
            isLoading={isLoading}
          />
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

const PesananCard = ({
  pesanan,
  konfirmasiOrderHandler,
  konfirmasiModalOpenHandler,
  openHandler,
  isLoading,
  navigate,
}) => (
  <div
    className={`mb-3 mx-5 mt-5 border shadow-lg rounded-lg p-3 ${
      pesanan.status === "ditolak" && "opacity-50"
    } relative`}
    key={pesanan._id}
  >
    {pesanan.status === "ditolak" && (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-bold bg-black bg-opacity-60 py-1 px-3 rounded-md">
          Ditolak
        </span>
      </div>
    )}
    {pesanan.status !== "ditolak" && (
      <>
        <div className="flex justify-between items-center mb-1">
          {pesanan.status === "menunggu" ? (
            <div className="flex items-center gap-2">
              <button
                className="flex text-xs items-center justify-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md"
                onClick={() => konfirmasiOrderHandler("diterima", pesanan._id)}
                disabled={isLoading}
              >
                {isLoading && <span className="loading loading-spinner loading-xs"></span>}
                <p>Konfirmasi</p>
              </button>
              <button
                className="text-xs bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => konfirmasiModalOpenHandler(pesanan._id)}
              >
                Tolak !
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                className={`w-24 h-8 text-white text-sm flex justify-center items-center rounded-xl
                  ${
                    pesanan.status === "diterima"
                      ? "bg-primary"
                      : pesanan.status === "diproses"
                      ? "bg-warning"
                      : "bg-success"
                  }
                  `}
                onClick={() => openHandler(pesanan._id)}
              >
                {pesanan.status}
              </button>
              <div
                className={`w-24 h-8 text-white text-sm flex justify-center items-center rounded-xl
                  ${pesanan.status_pembayaran === "belum lunas" ? "bg-primary" : "bg-success"}
                  `}
              >
                {pesanan.status_pembayaran}
              </div>
            </div>
          )}
          <button
            onClick={() => navigate(`detail/${pesanan._id}/${pesanan.pemesan}`)}
            className="w-24 h-8  text-xs flex justify-center gap-3 items-center rounded-xl"
          >
            <p>Detail</p>
            <img src={ArroRightIcon} alt="" className="w-4 h-4" />
          </button>
        </div>
      </>
    )}

    <p className="text-xs">Jenis Layanan : {pesanan.jenis_layanan}</p>
    <p className="text-xs">Pemesan : {pesanan.user_pemesan.nama}</p>
    <p className="text-xs">Email pemesan : {pesanan.user_pemesan.email}</p>
    <p className="text-xs">Total harga : {pesanan.total_harga}</p>
    {pesanan.meja !== 0 && <p className="text-xs">Meja : {pesanan.meja}</p>}
    <p className="text-xs">
      <TimeAgo timestamp={pesanan.waktu_pemesanan} />
    </p>
    {pesanan.pesanan.map((produk) => (
      <CardTransaksi key={produk._id} {...produk} />
    ))}
  </div>
);

const KategoriKomponen = ({ title, handler, selected }) => {
  return (
    <div>
      <div
        className={`py-1 text-xs px-3 flex justify-center border rounded-xl cursor-pointer ${
          selected && "bg-primary text-white"
        }`}
        onClick={handler}
      >
        {title}
      </div>
    </div>
  );
};

const LoadingKomponen = () => {
  return (
    <div className="flex w-full justify-center">
      <span className="loading loading-dots loading-md text-error"></span>
    </div>
  );
};

export default Pesanan;
