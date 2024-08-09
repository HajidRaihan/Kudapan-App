import React from "react";

const MenuCardSkeleton = () => {
  return (
    <div className="card flex w-32 h-42 flex-col gap-4">
      <div className="skeleton h-28 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};

export default MenuCardSkeleton;
