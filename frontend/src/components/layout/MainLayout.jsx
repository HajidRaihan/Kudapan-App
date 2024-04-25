import React, { useState, useEffect } from "react";
import { DecodeToken } from "../../helper/DecodeToken";
import { TokenHandler } from "../../helper/TokenHandler";
import BottomNavigation from "../navigation/BottomNavigation";

const MainLayout = ({ children }) => {
  return (
    <div className="lg:mx-96">
      {children}
      <div className="flex justify-center">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default MainLayout;
