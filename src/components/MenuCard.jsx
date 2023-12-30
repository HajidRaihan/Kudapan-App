import { Link } from "react-router-dom";

const MenuCard = () => {
  return (
    <Link to={"/order"} className="card bg-base-100 shadow-xl w-40">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
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
