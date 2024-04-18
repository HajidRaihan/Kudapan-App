import React, { useEffect } from "react";

const ChangeStatusOrderModal = ({ close, handler, status, onChange }) => {
  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box flex flex-col items-center">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={close}
          >
            ✕
          </button>
        </form>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Nama Produk</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={status}
            onChange={onChange}
            // defaultValue={produkDetail?.nama}
          />
        </label>

        <div className="flex justify-center mt-5 gap-3">
          {/* if there is a button in form, it will close the modal */}

          <button className="btn bg-primary btn-error w-32 text-white" onClick={handler}>
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ChangeStatusOrderModal;
