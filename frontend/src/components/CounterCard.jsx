import { Link } from "react-router-dom";
import McdImg from "../assets/mcd.jpg";

const CounterCard = ({ nama, deskripsi, image, id }) => {
  return (
    <Link to={`/warung/${id}`} className="card card-side shadow-lg h-24 mb-5 bg-white">
      <figure className="w-1/3 h-full ">
        <img
          src={`http://localhost:8000/images/${image}`}
          alt="Movie"
          className="object-cover h-full"
        />
      </figure>
      <div className="p-5 flex justify-center flex-col">
        <h2 className=" text-lg font-semibold">{nama}</h2>
        <p className="text-xs">{deskripsi}</p>
      </div>
    </Link>
  );
};

export default CounterCard;
