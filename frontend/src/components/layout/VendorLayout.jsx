import React, { useState, useEffect } from "react";
import BottomNavigationVendor from "../navigation/BottomNavigationVendor";

const VendorLayout = ({ children }) => {
  return (
    <div className="xl:mx-72 lg:mx-32">
      {children}
      <div className="flex justify-center">
        <BottomNavigationVendor />
      </div>
    </div>
  );
};

export default VendorLayout;
