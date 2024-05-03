import React from "react";
import BackButton from "./BackButton";
import MenuIcon from "../assets/icon/menu.svg";
import MenuDropdown from "./MenuDropdown";

const Header = ({ title, userId, handler, action }) => {
  return (
    <div className="relative">
      <div className="mx-5 absolute z-50 mt-1 cursor-pointer">
        <BackButton />
      </div>
      {/* <Banner title="Nasi Goreng Masuli" /> */}

      <h1 className="text-xl font-bold text-center my-5">{title}</h1>
      {/* <img src={MenuIcon} alt="" className="absolute top-0 right-5" /> */}
      <div className="absolute -top-3 right-5">
        {action && <MenuDropdown userId={userId} handler={handler} action={action} />}
      </div>
    </div>
  );
};

export default Header;
