import { Link } from "react-router-dom";
import BurgerImg from "../assets/burger-beef.jpg";

const MenuCard = () => {
  return (
    <Link to={"/order"} className="card bg-base-100 shadow-xl w-40">
      <figure>
        <img src={BurgerImg} alt="Shoes" />
      </figure>
      <div className="p-3">
        <h2 className="text-md font-semibold">es teh</h2>
        <p className="text-xs ">es teh manis murah meriah</p>
        <p className="text-[10px] flex justify-end">Rp. 10.000</p>
      </div>
    </Link>
  );
};

export default MenuCard;
