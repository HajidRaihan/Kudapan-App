import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon } from "@styled-icons/boxicons-regular";
import { Home as HomeIconSolid } from "@styled-icons/boxicons-solid";
import { Book } from "@styled-icons/boxicons-regular/Book";
import { Book as BookSolid } from "@styled-icons/boxicons-solid/Book";
import { Person } from "@styled-icons/bootstrap/Person";
import { PersonFill } from "@styled-icons/bootstrap/PersonFill";
import { History } from "@styled-icons/boxicons-regular/History";

import styled from "styled-components";

const HomeIconBlack = styled(HomeIcon)`
  color: #4c4c4c;
  width: 24px;
`;

const HomeIconSolidRed = styled(HomeIconSolid)`
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

const HistoryIconBlack = styled(History)`
  color: #4c4c4c;
  width: 24px;
`;

const HistoryIconRed = styled(History)`
  color: #f40027;
  width: 24px;
`;

const BottomNavigationVendor = () => {
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

        <Link to={"/vendor/rekap"} className="flex flex-col items-center justify-center">
          {location === "/vendor/rekap" ? <HistoryIconRed /> : <HistoryIconBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/vendor/rekap" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            Rekap
          </p>
        </Link>
        <Link to={"/vendor/profile"} className="flex flex-col items-center justify-center">
          {location === "/vendor/profile" ? <PersonIconRed /> : <PersonIconBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/vendor/profile" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            Profile
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
