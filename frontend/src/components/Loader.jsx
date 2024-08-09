import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span className="loading loading-spinner text-error loading-lg"></span>
    </div>
  );
};

export default Loader;
