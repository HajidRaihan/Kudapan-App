import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormatRupiah from "../helper/FormatRupiah";
import OrderModal from "./OrderModal";

const MenuCard = ({ nama, harga, image, _id }) => {
  const [menuId, setMenuId] = useState("");
  const [detail, setDetail] = useState();

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

  // useEffect(() => {
  //   try {
  //     getDetailProduk(_id).then((res) => {
  //       setDetail(res);
  //       console.log(res);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [_id]);
  return (
    <Link className="card bg-base-100 shadow-xl w-40 h-60" onClick={() => console.log("nama".nama)}>
      <figure>
        <img
          src={`http://localhost:8000/images/${image}`}
          alt="Shoes"
          className="h-28 w-full object-cover object-center"
        />
      </figure>
      <div className="p-3">
        <h2 className="text-md font-semibold">{nama}</h2>
        <p className="text-xs "></p>
        <p className="text-[10px] font-semibold">
          <FormatRupiah value={harga} />
        </p>
        {/* <p>+</p> */}
        <div className="absolute bottom-3  right-3">
          <button
            className="btn bg-primary btn-sm text-white hover:bg-secondary w-16"
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
        />
      )}
    </Link>
  );
};

export default MenuCard;
