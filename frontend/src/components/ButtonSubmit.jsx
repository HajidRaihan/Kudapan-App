import React from "react";

const ButtonSubmit = ({ handler, isLoading }) => {
  return (
    <div className="">
      <button className="btn btn-success w-full my-2  text-white" onClick={handler}>
        {isLoading && <span className="loading loading-spinner loading-sm"></span>}
        <p>Tambahkan Produk</p>
      </button>
      {/* <button className="btn btn-error w-full text-white">Order Langsung</button> */}
    </div>
  );
};

export default ButtonSubmit;
