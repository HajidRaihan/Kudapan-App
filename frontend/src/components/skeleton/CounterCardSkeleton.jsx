import React from "react";

const CounterCardSkeleton = () => {
  return (
    <div className={`card border card-side shadow-lg h-20 mb-5 overflow-hidden`}>
      <div className="skeleton w-[30%] h-full" />
      <div className="mx-5 gap-2 flex justify-center flex-col w-full">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
      </div>
    </div>
  );
};

export default CounterCardSkeleton;
