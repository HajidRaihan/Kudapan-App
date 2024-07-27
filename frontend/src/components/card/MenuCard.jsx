import { useState } from "react";
import { Link } from "react-router-dom";
import FormatRupiah from "../../helper/FormatRupiah";
import AlertModal from "../AlertModal";
import OrderModal from "../OrderModal";
import PropTypes from "prop-types";

const MenuCard = ({ nama, harga, image, _id, isSuccess, isError, setOrderCount }) => {
  const [menuId, setMenuId] = useState("");
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [isKeranjangModal, setIsKeranjangModal] = useState(false);

  const [open, setOpen] = useState(false);
  const openHandler = async (id) => {
    setOpen(true);
    // document.getElementById("ordermodal").showModal();
    setMenuId(id);
    console.log(id);
  };
  const closeHandler = async () => {
    // document.getElementById("ordermodal").close();
    setOpen(false);
  };

  const openAlertModalHandler = () => {
    setAlertModalOpen(true);
  };

  const isKeranjangModalHandler = () => {
    setIsKeranjangModal(true);
  };

  return (
    <Link className="card bg-base-100 shadow-md w-32 h-42 hover:scale-105 transform transition-transform duration-300">
      <figure>
        <img
          src={`http://localhost:8000/images/${image}`}
          alt="Shoes"
          className="min-h-28 w-full object-cover object-center rounded-xl"
        />
      </figure>
      <div className="p-3">
        <h2 className="text-xs font-medium text-ellipsis truncate">{nama}</h2>
        <p className="text-[10px] font-medium">
          <FormatRupiah value={harga} />
        </p>
        {/* <p>+</p> */}
        <div className="absolute bottom-3  right-3">
          <button
            className=" flex items-center justify-center  rounded-full bg-primary text-white hover:bg-secondary h-4 w-4"
            onClick={() => openHandler(_id)}
            // onClick={openHandler}
          >
            +
          </button>
        </div>
      </div>
      {open && (
        <OrderModal
          id={"ordermodal"}
          close={closeHandler}
          nama={nama}
          harga={harga}
          image={image}
          menuId={_id}
          openAlertModalHandler={openAlertModalHandler}
          isKeranjangModalHandler={isKeranjangModalHandler}
          isSuccess={isSuccess}
          isError={isError}
          setOrderCount={setOrderCount}
        />
      )}

      {alertModalOpen && (
        <AlertModal
          title={isKeranjangModal ? "Berhasil Menambahkan ke keranjang" : "Berhasil Memesan Produk"}
          close={() => setAlertModalOpen(false)}
        />
      )}
    </Link>
  );
};

MenuCard.propTypes = {
  nama: PropTypes.string.isRequired,
  harga: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  setOrderCount: PropTypes.func.isRequired,
};

export default MenuCard;
