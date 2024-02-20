import React, { useEffect } from "react";

const AlertModal = ({ title, close }) => {
  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">{title}</h3>
        {/* <p className="py-4">{title}</p> */}
        <div className="modal-action flex justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={close}>
              Tutup
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AlertModal;
