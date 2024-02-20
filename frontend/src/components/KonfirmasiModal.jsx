import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailProduk } from "../api/api";
import { addProdukKeranjang } from "../api/keranjangApi";
import { DecodeToken } from "../helper/DecodeToken";

const KonfirmasiModal = ({ close, title, handler }) => {
  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">{title}</h3>
          {/* <p className="py-4">{title}</p> */}
          <div className="flex justify-center mt-5 gap-3">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => close()}>
              Batalkan
            </button>
            <button className="btn bg-primary btn-error w-32 text-white" onClick={handler}>
              Order
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default KonfirmasiModal;
