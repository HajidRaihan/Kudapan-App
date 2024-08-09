import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getDetailProduk } from "../api/api";
import { addProdukKeranjang } from "../api/keranjangApi";
import { DecodeToken } from "../helper/DecodeToken";
import ButtonSubmit from "./ButtonSubmit";

const KonfirmasiModal = ({ close, title, handler, action, isSuccess, isError, isLoading }) => {
  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);

  return (
    <>
      <Toaster />
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
            {/* <button className="btn bg-primary btn-error w-32 text-white" onClick={handler}>
              {action}
            </button> */}
            <div className="w-32">
              <ButtonSubmit title={action} handler={handler} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default KonfirmasiModal;
