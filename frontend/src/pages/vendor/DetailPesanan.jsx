import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailOrder, orderPaymentCash } from "../../api/orderAPi";
import CardTransaksi from "../../components/card/CardTransaksi";
import Header from "../../components/Header";
import KonfirmasiModal from "../../components/KonfirmasiModal";
import QRModal from "../../components/modals/QrModal";
import SuksesModal from "../../components/modals/SuksesModal";
import { DecodeToken } from "../../helper/DecodeToken";
import TimeAgo from "../../helper/TimeAgo";

const DetailPesanan = () => {
  //   const [userId, setUserId] = useState();
  const [detailPesanan, setDetailPesanan] = useState();
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [konfirmasiModalOpen, setKonfirmasiModalOpen] = useState(false);
  const [suksesModalOpen, setSuksesModalOpen] = useState(false);

  const navigate = useNavigate();

  const { orderId, userId } = useParams();

  useEffect(() => {
    getDetailOrder(orderId).then((res) => {
      setDetailPesanan(res.data);
      console.log(res.data);
    });
  }, []);

  const paymentHandler = async () => {
    try {
      const res = await orderPaymentCash(userId, orderId);
      console.log(res);
      setSuksesModalOpen(true);
      setKonfirmasiModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="xl:mx-96 md:mx-32">
      {detailPesanan ? (
        <div>
          <Header title="Detail Pesanan" />
          <div className="mx-5 border p-5 rounded-lg shadow-lg">
            <p className="text-xs">Jenis Layanan : {detailPesanan.jenis_layanan}</p>
            <p className="text-xs">Pemesan : {detailPesanan.user_pemesan.nama}</p>
            <p className="text-xs">Email pemesan : {detailPesanan.user_pemesan.email}</p>
            {/* <p className="text-xs">Waktu pemesanan : {detailPesanan.waktu_pemesanan}</p> */}
            <p className="text-xs">Total harga : {detailPesanan.total_harga}</p>
            {detailPesanan.meja !== 0 && <p className="text-xs">Meja : {detailPesanan.meja}</p>}
            <p className="text-xs">
              <TimeAgo timestamp={detailPesanan.waktu_pemesanan} />
            </p>
            {detailPesanan.pesanan.map((produk) => {
              return <CardTransaksi key={produk._id} {...produk} />;
            })}
            {detailPesanan.status_pembayaran !== "lunas" ? (
              <div className="mt-5">
                <h1 className="text-center mb-3 font-semibold text-md">Pilih metode pembayaran</h1>
                <div className="w-full flex gap-5 ">
                  <button
                    onClick={() => setKonfirmasiModalOpen(true)}
                    className="bg-warning w-1/2 h-10 text-white  text-sm flex justify-center gap-3 items-center rounded-xl"
                  >
                    Cash
                  </button>
                  <button
                    onClick={() => setQrModalOpen(true)}
                    className="w-1/2 h-10 bg-success text-white text-sm flex justify-center gap-3 items-center rounded-xl"
                  >
                    Qris
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center mt-5 font-semibold text-lg">Pesanan sudah lunas</p>
            )}
          </div>
          {qrModalOpen && <QRModal close={() => setQrModalOpen(false)} />}
          {konfirmasiModalOpen && (
            <KonfirmasiModal
              title={"Apakah anda ingin melunaskan pesanan ini?"}
              action={"Lunas"}
              handler={paymentHandler}
              close={() => setKonfirmasiModalOpen(false)}
            />
          )}
          {suksesModalOpen && (
            <SuksesModal
              title="Berhasil melunaskan pembayaran"
              action="Kembali"
              handler={() => navigate("/vendor/pesanan")}
            />
          )}
        </div>
      ) : (
        <p>loading ...</p>
      )}
    </div>
  );
};

export default DetailPesanan;
