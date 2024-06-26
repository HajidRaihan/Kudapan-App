import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Pastikan untuk mengimpor PropTypes

const CounterCard = ({ nama, deskripsi, image, id }) => {
  return (
    <Link to={`/warung/${id}`} className="card card-side shadow-lg h-20 mb-5 bg-white">
      <figure className="w-[30%] h-full ">
        <img
          src={`http://localhost:8000/images/${image}`}
          alt="menu"
          className="object-cover h-full"
        />
      </figure>
      <div className="p-5 flex justify-center flex-col">
        <h2 className=" text-sm font-semibold">{nama}</h2>
        <p className="text-xs">{deskripsi}</p>
      </div>
    </Link>
  );
};

CounterCard.propTypes = {
  nama: PropTypes.string.isRequired,
  deskripsi: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CounterCard;
