import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailProduk } from "../api/api";
import { addProdukKeranjang } from "../api/keranjangApi";
import { addOrder } from "../api/orderAPi";
import { DecodeToken } from "../helper/DecodeToken";
import FormatRupiah from "../helper/FormatRupiah";
import PropTypes from "prop-types";

const OrderModal = ({
  close,
  menuId,
  nama,
  harga,
  openAlertModalHandler,
  isKeranjangModalHandler,
  isSuccess,
  isError,
  setOrderCount,
}) => {
  const [jumlah, setJumlah] = useState(1);
  const [catatan, setCatatan] = useState("");
  const { tokoId } = useParams();
  const [detail, setDetail] = useState();
  // const dataToken = DecodeToken();
  const token = DecodeToken();
  const userId = token._id;

  // console.log(nama, menuId);

  const handleAddKeranjang = async () => {
    const data = {
      produkId: menuId,
      tokoId: tokoId,
      jumlah: jumlah,
      // image: image,
      catatan: catatan,
    };
    console.log({ data });
    try {
      const response = await addProdukKeranjang(userId, data);
      console.log(response);
      close();
      // openAlertModalHandler();
      isSuccess();
      setOrderCount((prev) => prev + parseInt(jumlah));
      // setOrderCount((prev) => prev - parseInt(jumlah));
      console.log(data);
    } catch (error) {
      console.log(error);
      isError();
    }
  };

  const orderLangsungHandler = async () => {
    isKeranjangModalHandler();
    const data = {
      produkId: menuId,
      tokoId: tokoId,
      jumlah: jumlah,
      // image: image,
      catatan: catatan,
    };
    try {
      const response = await addProdukKeranjang(userId, data);
      console.log(response);

      const responseOrder = await addOrder(userId, 1);
      console.log(responseOrder);
      close();
      openAlertModalHandler();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.getElementById("ordermodal").showModal();
  }, []);



  useEffect(() => {
    const getMenuById = async () => {
      if (menuId) {
        try {
          const response = await getDetailProduk(menuId);
          setDetail(response);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
        getMenuById();
      }
    };
  }, [menuId]);


  

  return (
    <>
      <dialog id={"ordermodal"} className="modal py-10">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => close()}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{nama}</h3>
          <p className="py-4">
            <FormatRupiah value={harga * jumlah} />
          </p>
          <form action="">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Jumlah</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={(e) => setJumlah(e.target.value)}
                value={jumlah}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Catatan</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                onChange={(e) => setCatatan(e.target.value)}
                value={catatan}
              />
            </label>
            <div className="mt-2">
              <button
                className="btn btn-success w-full my-2  text-white"
                onClick={handleAddKeranjang}
              >
                Tambahkan keranjang
              </button>
              {/* <button className="btn btn-error w-full text-white" onClick={orderLangsungHandler}>
                Order Langsung
              </button> */}
            </div>
          </form>
        </div>
      </dialog>
    </>
    // <div>
    //   <dialog id={id} className="modal">
    //     <div className="modal-box">
    //       <h3 className="font-bold text-lg">Hello!</h3>
    //       <p className="py-4">Press ESC key or click the button below to close</p>
    //       <div className="modal-action">
    //         <form method="dialog" className="flex flex-col gap-3 w-full">
    //           {/* if there is a button in form, it will close the modal */}
    //           <input
    //             type="text"
    //             placeholder="Type here"
    //             className="input input-bordered w-full max-w-xs"
    //           />
    //           <input
    //             type="text"
    //             placeholder="Type here"
    //             className="input input-bordered w-full max-w-xs"
    //           />
    //           <input
    //             type="text"
    //             placeholder="Type here"
    //             className="input input-bordered w-full max-w-xs"
    //           />
    //           <button className="btn" onClick={() => close()}>
    //             Close
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </dialog>
    // </div>
  );
};

OrderModal.propTypes = {
  close: PropTypes.func.isRequired,
  image: PropTypes.string,
  menuId: PropTypes.string.isRequired,
  nama: PropTypes.string.isRequired,
  harga: PropTypes.number.isRequired,
  openAlertModalHandler: PropTypes.func.isRequired,
  isKeranjangModalHandler: PropTypes.func.isRequired,
  isSuccess: PropTypes.func.isRequired,
  isError: PropTypes.func.isRequired,
  setOrderCount: PropTypes.func.isRequired,
};

export default OrderModal;
