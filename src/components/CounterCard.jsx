import { Link } from "react-router-dom";
import Pendi from "../assets/efendi.jpg";

const CounterCard = () => {
  return (
    <Link to={"/warung"} className="card card-side shadow-lg h-32 mb-5 bg-white">
      <figure className="w-1/3 h-full ">
        <img src={Pendi} alt="Movie" className="object-cover h-full" />
      </figure>
      <div className="p-5 flex justify-center flex-col">
        <h2 className=" text-lg font-semibold">Nasi goreng Masuli</h2>
        <p className="text-xs">Nasi goreng ku enak sekali</p>
      </div>
    </Link>
  );
};

export default CounterCard;
