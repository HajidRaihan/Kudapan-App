import Chart from "../assets/icon/shopping-cart-red.svg";
import ChartBlack from "../assets/icon/shopping-cart-black.svg";
import HistoryIcon from "../assets/icon/book-red.svg";
import HistoryIconBlack from "../assets/icon/book-black.svg";
import HomeIcon from "../assets/icon/home-red.svg";
import HomeIconBlack from "../assets/icon/home-black.svg";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation().pathname;
  return (
    // <div className="w-full h-12 bg-primary fixed m-0 bottom-0 flex items-center justify-center shadow-2xl">
    //   <div className="flex items-center justify-between gap-14">
    //     <Link to={"/"}>
    //       <img
    //         src={HomeIcon}
    //         alt=""
    //         className="text-white hover:shadow-md hover:shadow-white mx-auto h-5 w-5"
    //       />
    //       <p className="text-center text-[10px] text-white">home</p>
    //     </Link>
    //     <Link to={"/transaksi"}>
    //       <img
    //         src={HistoryIcon}
    //         alt=""
    //         className="text-white hover:shadow-md hover:shadow-white mx-auto h-5 w-5"
    //       />
    //       <p className="text-center text-[10px] text-white">transaksi</p>
    //     </Link>
    //     <div>
    //       <img
    //         src={Chart}
    //         alt=""
    //         className="text-white hover:shadow-md hover:shadow-white mx-auto h-5 w-5"
    //       />
    //       <p className="text-center text-[10px] text-white">keranjang</p>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full h-12 bg-white fixed m-0 bottom-0 flex items-center justify-center shadow-2xl shadow-black z-50">
      <div className="flex items-center justify-between gap-14">
        <Link to={"/"}>
          <img
            src={location === "/" ? HomeIcon : HomeIconBlack}
            alt=""
            className="hover:shadow-md hover:shadow-white mx-auto h-5 w-5"
          />
          <p
            className={`text-center text-[10px] ${
              location === "/" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            home
          </p>
        </Link>
        <Link to={"/transaksi"}>
          <img
            src={location === "/transaksi" ? HistoryIcon : HistoryIconBlack}
            alt=""
            className="text-white hover:shadow-md hover:shadow-white mx-auto h-5 w-5"
          />
          <p
            className={`text-center text-[10px] ${
              location === "/transaksi" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            transaksi
          </p>
        </Link>
        <div>
          <img
            src={location === "/keranjang" ? Chart : ChartBlack}
            alt=""
            className="text-white hover:shadow-md hover:shadow-white mx-auto h-5 w-5"
          />
          <p
            className={`text-center text-[10px] ${
              location === "/keranjang" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            keranjang
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
