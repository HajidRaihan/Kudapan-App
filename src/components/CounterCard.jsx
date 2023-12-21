const CounterCard = () => {
  return (
    <div className="card card-side bg-base-100 shadow-lg h-44 mb-5">
      <figure className="w-1/3 h-full ">
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
          className="object-cover h-full"
        />
      </figure>
      <div className="p-5 flex justify-center flex-col">
        <h2 className=" text-lg font-semibold">Nasi goreng Masuli</h2>
        <p className="text-xs">Nasi goreng ku enak sekali</p>
      </div>
    </div>
  );
};

export default CounterCard;
