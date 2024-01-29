import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderModal from "./OrderModal";

const MenuCard = ({ nama, harga, image, _id }) => {
  const [menuId, setMenuId] = useState("");
  const [detail, setDetail] = useState();

  const [open, setOpen] = useState(false);
  const openHandler = (id) => {
    document.getElementById("ordermodal").showModal();
    setMenuId(id);
    console.log(id);
    setOpen(true);
  };
  const closeHandler = () => {
    document.getElementById("ordermodal").close();
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
    <Link className="card bg-base-100 shadow-xl w-40">
      <figure>
        <img src={`http://localhost:8000/images/${image}`} alt="Shoes" />
      </figure>
      <div className="p-3">
        <h2 className="text-md font-semibold">{nama}</h2>
        <p className="text-xs "></p>
        <p className="text-[10px] flex justify-end">{harga}</p>
        {/* <p>+</p> */}
        <div className="flex justify-end mt-2 ">
          <button
            className="btn bg-primary btn-sm text-white hover:bg-secondary w-16"
            onClick={() => openHandler(_id)}
            // onClick={openHandler}
          >
            +
          </button>
        </div>
      </div>
      <OrderModal
        id={"ordermodal"}
        close={closeHandler}
        nama={nama}
        harga={harga}
        image={image}
        menuId={_id}
      />
    </Link>
  );
};

export default MenuCard;
