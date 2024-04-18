import React, { useEffect, useState } from "react";
import { changeStatusOrder, getPesanan } from "../../api/pesananApi";
import CardTransaksi from "../../components/card/CardTransaksi";
import { DecodeToken } from "../../helper/DecodeToken";
import { formatDistanceToNow } from "date-fns";
import TimeAgo from "../../helper/TimeAgo";
import ChangeStatusOrderModal from "../../components/modals/ChangeStatusOrderModal";

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
    getPesanan(userId).then((res) => {
      console.log(res);
      setPesananData(res);
    });
  }, []);

  const changeStatusOrderHandler = async () => {
    console.log({ status });
    const data = {
      status: status,
    };
    const res = await changeStatusOrder(userId, orderId, data);
    console.log({ res });
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
      {pesananData
        ? [...pesananData].reverse().map((pesanan) => {
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
        : ""}

      {open && (
        <ChangeStatusOrderModal
          close={closeHandler}
          handler={changeStatusOrderHandler}
          value={status}
          onChange={statusOnChange}
        />
      )}
    </div>
  );
};

export default Pesanan;
