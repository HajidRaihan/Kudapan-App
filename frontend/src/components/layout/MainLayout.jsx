import React, { useState, useEffect } from "react";
import { DecodeToken } from "../../helper/DecodeToken";
import { TokenHandler } from "../../helper/TokenHandler";
import BottomNavigation from "../navigation/BottomNavigation";

const MainLayout = ({ orderCount, children }) => {
  return (
    <div className="xl:mx-96 md:mx-32">
      {children}
      <div className="flex justify-center">
        <BottomNavigation orderCount={orderCount} />
      </div>
    </div>
  );
};

export default MainLayout;
