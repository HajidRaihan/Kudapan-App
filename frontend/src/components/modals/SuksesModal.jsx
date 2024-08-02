import React, { useEffect } from "react";

const SuksesModal = ({ title, action, handler }) => {
  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">{title}</h3>
        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
        <div className="modal-action flex justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={handler}>
              {action}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SuksesModal;
