import React, { useState } from "react";
import MenuIcon from "../assets/icon/menu.svg";
import DeleteIcon from "../assets/icon/delete.svg";
import { deleteHistory } from "../api/historyApi";
import AlertModal from "./AlertModal";

const MenuDropdown = ({ userId, handler, action }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <details className="dropdown dropdown-bottom dropdown-end p-0">
        <summary tabIndex={0} role="button" className="btn m-1 btn-ghost">
          <img src={MenuIcon} alt="" />
        </summary>
        <ul
          tabIndex={0}
          className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
        >
          <li>
            <div className="hover:bg-red-200" onClick={handler}>
              <img src={DeleteIcon} alt="" className="w-5 h-5" />
              <p>{action}</p>
            </div>
          </li>
        </ul>
      </details>
      {openModal && (
        <AlertModal
          title={"Berhasil Menghapus Riwayat"}
          close={() => {
            setOpenModal(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
};

export default MenuDropdown;
