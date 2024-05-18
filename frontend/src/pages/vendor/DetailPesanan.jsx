import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailOrder } from "../../api/orderAPi";
import CardTransaksi from "../../components/card/CardTransaksi";
import Header from "../../components/Header";
import VendorLayout from "../../components/layout/VendorLayout";
import TimeAgo from "../../helper/TimeAgo";
import QrTransaksi from "../QrTransaksi";

const DetailPesanan = () => {
  const { orderId } = useParams();
  const [detailOrder, setDetailOrder] = useState();

  useEffect(() => {
    const getDetail = async () => {
      const res = await getDetailOrder(orderId);
      console.log(res.data);
      setDetailOrder(res.data);
    };
    getDetail();
  }, [orderId]);
  return (
    <div className="mb-20">
      <VendorLayout>
        {/* <Toaster /> */}
        <Header title="Pesanan" />
        {detailOrder ? (
          <div className="mb-10 mx-5 mt-5" key={detailOrder._id}>
            <div className="flex justify-between items-center">
              <button
                className={`w-24 h-8 text-white text-sm flex justify-center items-center rounded-xl
                    ${
                      detailOrder.status === "diterima"
                        ? "bg-primary"
                        : detailOrder.status === "diproses"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }
                    `}
                onClick={() => openHandler(detailOrder._id)}
              >
                {detailOrder.status}
              </button>
              {/* <button
                onClick={() => navigate(`${detailOrder._id}`)}
                className="w-24 h-8 btn-accent btn text-white text-sm flex justify-center items-center rounded-xl"
              >
                Detail
              </button> */}
            </div>
            <div className="w-full border border-black my-3" />
            {/* {detailOrder.detailOrder.map((toko) => {
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
            <p className="text-xs">Pemesan : {detailOrder.user_pemesan.nama}</p>
            <p className="text-xs">Email pemesan : {detailOrder.user_pemesan.email}</p>
            <p className="text-xs">Total harga : {detailOrder.total_harga}</p>
            {/* {/* <p className="text-xs">Meja : {detailOrder.meja}</p> */}
            <p className="text-xs">
              <TimeAgo timestamp={detailOrder.waktu_pemesanan} />
            </p>
            {detailOrder.pesanan.map((produk) => {
              return <CardTransaksi key={produk._id} {...produk} />;
            })}

            <QrTransaksi value={`localhost:5173/payment/${detailOrder._id}`} />
          </div>
        ) : (
          <p>loading...</p>
        )}

        {/* {open && (
          <ChangeStatusOrderModal
            close={closeHandler}
            handler={changeStatusOrderHandler}
            value={status}
            onChange={statusOnChange}
          />
        )} */}
      </VendorLayout>
    </div>
  );
};

export default DetailPesanan;
