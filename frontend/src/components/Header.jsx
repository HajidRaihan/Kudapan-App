import React from "react";
import BackButton from "./BackButton";

const Header = ({ title }) => {
  return (
    <div className="relative">
      <div className="mx-5 absolute z-50 mt-1">
        <BackButton />
      </div>
      {/* <Banner title="Nasi Goreng Masuli" /> */}

      <h1 className="text-xl font-bold text-center my-5">{title}</h1>
    </div>
  );
};

export default Header;
