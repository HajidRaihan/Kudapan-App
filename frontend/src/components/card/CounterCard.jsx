// import { Link } from "react-router-dom";
// import PropTypes from "prop-types"; // Pastikan untuk mengimpor PropTypes

// const CounterCard = ({ nama, deskripsi, image, id, incompleteOrdersCount }) => {
//   return (
//     <Link to={`/warung/${id}`} className="card card-side shadow-lg h-20 mb-5 bg-white">
//       <figure className="w-[30%] h-full ">
//         <img
//           src={`http://localhost:8000/images/${image}`}
//           alt="menu"
//           className="object-cover h-full"
//         />
//       </figure>
//       <div className="p-5 flex justify-center flex-col">
//         <h2 className=" text-sm font-semibold">{nama}</h2>
//         <p className="text-xs">{deskripsi}</p>
//         <p className="text-xs">yang antri {incompleteOrdersCount}</p>
//       </div>
//     </Link>
//   );
// };

// CounterCard.propTypes = {
//   nama: PropTypes.string.isRequired,
//   deskripsi: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
// };
// @styled-icons/fluentui-system-regular/PeopleQueue
// export default CounterCard;

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PeopleQueue } from "@styled-icons/fluentui-system-filled/PeopleQueue";
import { styled } from "styled-components";

const PeopleQueueRed = styled(PeopleQueue)`
  color: #fff;
  width: 14px;
`;

const CounterCard = ({ nama, deskripsi, image, id, incompleteOrdersCount, isActive = true }) => {
  return (
    <Link
      to={isActive ? `/warung/${id}` : "#"}
      className={`relative card border card-side shadow-lg h-20 mb-5 rounded-lg overflow-hidden transform transition-transform duration-300 ${
        isActive ? "hover:scale-105" : "opacity-50 pointer-events-none"
      }`}
    >
      <div className="absolute right-2 top-2 p-1 bg-primary gap-1 flex items-center rounded-md">
        <PeopleQueueRed />
        <p className="text-[10px] font-medium text-white">{incompleteOrdersCount}</p>
      </div>
      <figure className="w-[30%] h-full">
        <img
          src={`${import.meta.env.VITE_IMGURL}/${image}`}
          alt="menu"
          className="object-cover h-full"
        />
      </figure>
      <div className="p-5 flex justify-center flex-col">
        <h2 className=" text-sm font-semibold">{nama}</h2>
        <p className="text-xs">{deskripsi}</p>
        {!isActive && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold bg-black bg-opacity-60 py-1 px-3 rounded-md">
              Closed Order
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

CounterCard.propTypes = {
  nama: PropTypes.string.isRequired,
  deskripsi: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  incompleteOrdersCount: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default CounterCard;
