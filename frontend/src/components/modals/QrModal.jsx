import { useEffect } from "react";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";

const QRModal = ({ value, onChange, handler, close }) => {
  useEffect(() => {
    document.getElementById("my_modal_1").showModal();
  }, []);

  const { orderId, userId } = useParams();

  QRModal.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    handler: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  };

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
        <div className="m-5">
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`localhost:5173/payment/${orderId}/${userId}`}
              viewBox={`0 0 256 256`}
            />
          </div>
          <p>{/* localhost:5173/payment/{orderId}/{userId} */}</p>
        </div>

        <div className="flex justify-center mt-5 gap-3 w-full">
          {/* if there is a button in form, it will close the modal */}

          <button className="btn bg-primary btn-error w-full text-white" onClick={close}>
            Tutup
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default QRModal;
