import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailOrder, orderPayment } from "../api/orderAPi";
import CardTransaksi from "../components/card/CardTransaksi";

const Payment = () => {
  const navigate = useNavigate();
  const { orderId, userId } = useParams();
  const [detailOrder, setDetailOrder] = useState();
  const [nominal, setNominal] = useState();

  const nominalOnChange = (e) => {
    setNominal(e.target.value);
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const data = {
      nominal: detailOrder.total_harga,
    };
    try {
      console.log(data);
      const res = await orderPayment(data, userId, orderId);

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      const res = await getDetailOrder(orderId);
      console.log(res.data);
      setDetailOrder(res.data);
    };
    getDetail();
  }, [orderId]);

  return (
    <div className="mt-3 flex flex-col justify-center md:w-[700px] mx-auto p-10">
      <h className="text-4xl text-center font-semibold text-primary">Pembayaran</h>
      {detailOrder ? (
        <div className="mb-5  mt-5" key={detailOrder._id}>
          <div className="flex justify-between items-center"></div>
          <div className="w-full border border-black my-3" />

          {detailOrder.pesanan.map((produk) => {
            return <CardTransaksi key={produk._id} {...produk} />;
          })}

          {/* <QrTransaksi value={`localhost:5173/payment/${detailOrder._id}`} /> */}
        </div>
      ) : (
        <p>loading...</p>
      )}

      <label className="font-bold input input-bordered flex items-center gap-2 w-full rounded-2xl">
        <p>Rp.</p>
        <input
          type="text"
          className="grow"
          disabled
          placeholder="Password"
          onChange={nominalOnChange}
          value={new Intl.NumberFormat("id-ID").format(detailOrder?.total_harga)}
        />
      </label>
      <button className="btn btn-error w-full mt-3 text-white rounded-2xl" onClick={paymentHandler}>
        Konfirmasi Pembayaran
      </button>
    </div>
  );
};

export default Payment;
