import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailOrder, orderPayment } from "../api/orderAPi";
import AlertModal from "../components/AlertModal";
import ButtonSubmit from "../components/ButtonSubmit";
import CardTransaksi from "../components/card/CardTransaksi";

const Payment = () => {
  const navigate = useNavigate();
  const { orderId, userId } = useParams();
  const [detailOrder, setDetailOrder] = useState();
  const [nominal, setNominal] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nominalOnChange = (e) => {
    setNominal(e.target.value);
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      nominal: detailOrder.total_harga,
    };
    try {
      console.log(data);
      const res = await orderPayment(data, userId, orderId);

      document.getElementById("my_modal_1").showModal();

      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      const res = await getDetailOrder(orderId);
      console.log(res.data);
      setDetailOrder(res.data);
      console.log(detailOrder);
    };
    getDetail();
  }, [orderId]);

  return (
    <div className="mt-3 flex flex-col justify-center md:w-[700px] mx-auto p-10">
      <Toaster />
      <h className="text-4xl text-center font-semibold text-primary">Pembayaran</h>
      {detailOrder ? (
        <div className="mb-5  mt-5" key={detailOrder._id}>
          <div className="flex justify-between items-center"></div>
          <div className="w-full border border-black my-3" />

          {detailOrder.order_items.map((produk) => {
            return <CardTransaksi key={produk._id} {...produk} />;
          })}

          {/* <QrTransaksi value={`localhost:5173/payment/${detailOrder._id}`} /> */}
        </div>
      ) : (
        <p>loading...</p>
      )}

      <label className="mb-3 font-bold input input-bordered flex items-center gap-2 w-full rounded-2xl">
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
      {/* <button className="btn btn-error w-full mt-3 text-white rounded-2xl" onClick={paymentHandler}>
        Konfirmasi Pembayaran
      </button> */}
      <ButtonSubmit
        title={"Konfirmasi Pembayaran"}
        handler={paymentHandler}
        isLoading={isLoading}
      />

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Berhasil melakukan pembayaran</h3>
          {/* <p className="py-4">{title}</p> */}
          <div className="modal-action flex justify-center">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => navigate("/")}>
                {" "}
                Kembali Ke Home
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Payment;
