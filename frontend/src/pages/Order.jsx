import { useState } from "react";
import Banner from "../components/Banner";

const Order = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Banner title="Food Details" />
      <div className="mx-5 my-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-2xl">Es teh Nusantara</p>
            <p className="text-[#7D0A0A] font-bold text-xl">Rp. 10.000</p>
          </div>

          <div className="flex w-28 bg-[#7D0A0A] text-white justify-center items-center gap-5 rounded-xl h-10 font-bold">
            <button
              onClick={() => {
                if (counter === 0) {
                  return;
                }
                setCounter((prev) => prev - 1);
              }}
            >
              -
            </button>
            <div>{counter}</div>
            <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
          </div>
        </div>
        <div className="mt-5">
          <p className="font-bold">about food</p>
          <p className="text-xs">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates dignissimos
            temporibus ipsum cum eaque eius possimus facilis dicta iure dolores ab, exercitationem
            magnam? Reprehenderit earum commodi vel quisquam expedita maiores eligendi veniam
            deserunt asperiores dignissimos. Harum voluptatem reiciendis sequi et illo fuga omnis ab
            laborum, est delectus nisi fugiat quibusdam?
          </p>
        </div>
        <div className="mt-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Catatan</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs text-xs"
            />
          </label>
        </div>
        <button className="w-full btn bg-[#7D0A0A] text-white hover:bg-[#5b0a0a] py-2 rounded-xl mt-10">
          Order
        </button>
      </div>
    </>
  );
};

export default Order;
