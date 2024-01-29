import React from "react";

const Input = ({ type, label, value, onChange, placeholder }) => {
  return (
    <div className="w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
