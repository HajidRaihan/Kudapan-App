import React, { useEffect } from "react";

const ActionModal = () => {
  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Apakah anda ingin menghapus produk?</h3>
        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
        <div className="modal-action flex justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ActionModal;
