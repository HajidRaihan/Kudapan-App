// import Chart from "../../assets/icon/shopping-cart-red.svg";
import ChartBlack from "../../assets/icon/shopping-cart-black.svg";
import HistoryIcon from "../../assets/icon/book-red.svg";
import HistoryIconBlack from "../../assets/icon/book-black.svg";
// import HomeIcon from "../../assets/icon/home-red.svg";
// import HomeIconBlack from "../../assets/icon/home-black.svg";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon } from "@styled-icons/boxicons-regular";
import { Home as HomeIconSolid } from "@styled-icons/boxicons-solid";
import { Cart } from "@styled-icons/fluentui-system-regular/Cart";
import { Cart as CartSolid } from "@styled-icons/fluentui-system-filled/Cart";
import { Book } from "@styled-icons/boxicons-regular/Book";
import { Book as BookSolid } from "@styled-icons/boxicons-solid/Book";
import { Person } from "@styled-icons/bootstrap/Person";
import { PersonFill } from "@styled-icons/bootstrap/PersonFill";
import styled from "styled-components";
import { TokenHandler } from "../../helper/TokenHandler";
import { DecodeToken } from "../../helper/DecodeToken";
import { useEffect, useState } from "react";

const HomeIconBlack = styled(HomeIcon)`
  color: #4c4c4c;
  width: 24px;
`;

const HomeIconSolidRed = styled(HomeIconSolid)`
  color: #f40027;
  width: 24px;
`;

const CartIconBlack = styled(Cart)`
  color: #4c4c4c;
  width: 24px;
`;

const CartIconRed = styled(CartSolid)`
  color: #f40027;
  width: 24px;
`;

const BookBlack = styled(Book)`
  color: #4c4c4c;
  width: 24px;
`;

const BookSolidRed = styled(BookSolid)`
  color: #f40027;
  width: 24px;
`;

const PersonIconBlack = styled(Person)`
  color: #4c4c4c;
  width: 24px;
`;

const PersonIconRed = styled(PersonFill)`
  color: #f40027;
  width: 24px;
`;

const BottomNavigationVendor = ({ userImage }) => {
  const location = useLocation().pathname;

  return (
    <div className="w-full h-12 bg-white fixed m-0 bottom-0 flex items-center justify-center shadow-2xl shadow-black z-50">
      <div className="flex items-center justify-between gap-14">
        <Link to={"/vendor"} className="flex flex-col items-center justify-center">
          {location === "/vendor" ? <HomeIconSolidRed /> : <HomeIconBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/vendor" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            home
          </p>
        </Link>
        <Link to={"/vendor/pesanan"} className="flex flex-col items-center justify-center">
          {location === "/vendor/pesanan" ? <BookSolidRed /> : <BookBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/vendor/pesanan" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            pesanan
          </p>
        </Link>
        {/* <Link to={"/keranjang"} className="flex flex-col items-center justify-center">
          {location === "/keranjang" ? <CartIconRed /> : <CartIconBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/keranjang" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            keranjang
          </p>
        </Link>

        <Link to={"/profile"} className="flex flex-col items-center justify-center">
          {location === "/profile" ? <PersonIconRed /> : <PersonIconBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/profile" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            Profile
          </p>
        </Link> */}
      </div>
    </div>
  );
};

export default BottomNavigationVendor;
