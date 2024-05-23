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
import { DecodeToken } from "../../helper/DecodeToken";
import { useEffect, useState } from "react";
import { getJumlahKeranjang } from "../../api/keranjangApi";
import PropTypes from "prop-types";

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

const BottomNavigation = ({ orderCount }) => {
  const location = useLocation().pathname;

  const [jumlahKeranjang, setJumlahKeranjang] = useState(0);

  const userId = DecodeToken()._id;

  useEffect(() => {
    const fetchJumlahKeranjang = async () => {
      try {
        const response = await getJumlahKeranjang(userId);
        if (response.jumlahKeranjang !== undefined) {
          setJumlahKeranjang(response.jumlahKeranjang);
        }
        console.log("ini response jumlah keranjang ", response);
      } catch (error) {
        console.error("Error fetching jumlah keranjang:", error);
      }
    };

    if (userId) {
      fetchJumlahKeranjang();
    }
  }, [userId, orderCount]);

  return (
    <div className="w-full h-12 bg-white fixed m-0 bottom-0 flex items-center justify-center shadow-2xl shadow-black z-50">
      <div className="flex items-center justify-between gap-14">
        <Link to={"/"} className="flex flex-col items-center justify-center">
          {location === "/" ? <HomeIconSolidRed /> : <HomeIconBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            home
          </p>
        </Link>

        <Link to={"/riwayat"} className="flex flex-col items-center justify-center">
          {location === "/riwayat" ? <BookSolidRed /> : <BookBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/riwayat" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            riwayat
          </p>
        </Link>
        <Link to={"/keranjang"} className="relative flex flex-col items-center justify-center">
          {location === "/keranjang" ? <CartIconRed /> : <CartIconBlack />}
          <p
            className={`text-center text-[10px] ${
              location === "/keranjang" ? "text-primary" : "text-[#4C4C4C]"
            } `}
          >
            keranjang
          </p>
          {jumlahKeranjang !== 0 && (
            <div className="absolute top-0 left-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <p className="text-[10px] text-white">{jumlahKeranjang}</p>
            </div>
          )}
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
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
