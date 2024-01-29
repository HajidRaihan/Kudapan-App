import React, { useEffect, useState } from "react";
import { getDetailProduk } from "../api/api";
import { addProdukKeranjang } from "../api/keranjangApi";

const OrderModal = ({ id, close, image, menuId, nama, harga }) => {
  const [jumlah, setJumlah] = useState(1);
  const [catatan, setCatatan] = useState("");

  const handleAddKeranjang = async () => {
    const data = {
      produkId: menuId,
      jumlah: jumlah,
      image: image,
      catatan: catatan,
    };
    console.log({ data });
    try {
      const response = await addProdukKeranjang("65b2a47c5a99778d24c45d50", data);
      console.log(response);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <dialog id={id} className="modal py-10">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => close()}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{nama}</h3>
          <p className="py-4">Rp. {harga * jumlah}</p>

          <form action="">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Jumlah</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setJumlah(e.target.value)}
                value={jumlah}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Catatan</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setCatatan(e.target.value)}
                value={catatan}
              />
            </label>
            <div className="">
              <button
                className="btn btn-success w-full my-2  text-white"
                onClick={handleAddKeranjang}
              >
                Tambahkan keranjang
              </button>
              <button className="btn btn-error w-full text-white">Order Langsung</button>
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

export default OrderModal;
