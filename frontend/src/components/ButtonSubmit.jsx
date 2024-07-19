import React from "react";

const ButtonSubmit = ({ handler, isLoading, title }) => {
  return (
    <button className="btn btn-error w-full mt-3 text-white rounded-2xl" onClick={handler}>
      {isLoading && <span className="loading loading-spinner loading-sm"></span>}
      <p>{title}</p>
    </button>
  );
};

export default ButtonSubmit;
