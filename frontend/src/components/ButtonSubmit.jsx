import React from "react";

const ButtonSubmit = ({ handler, isLoading, title }) => {
  return (
    <button
      className="btn bg-primary btn-error w-full text-white "
      onClick={handler}
      disabled={isLoading}
    >
      {isLoading && <span className="loading loading-spinner loading-sm"></span>}
      <p>{title}</p>
    </button>
  );
};

export default ButtonSubmit;
