import Cookies from "js-cookie";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const logoutHanlder = () => {
    Cookies.remove("access_token_kudapan");
    window.location.reload();
  };

  const location = useLocation().pathname;
  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <div className="bg-primary w-64 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-primary-foreground text-lg font-semibold mb-4 text-white">Admin</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to={"/admin"}
                className={`${
                  location === "/admin" ? "bg-white !text-black !font-semibold" : ""
                } block p-2 rounded hover:bg-white hover:text-black hover:font-semibold text-white transition-transform`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/vendor-register"}
                className={`${
                  location === "/admin/vendor-register" ? "bg-white !text-black !font-semibold" : ""
                } block p-2 rounded hover:bg-white hover:text-black hover:font-semibold text-white`}
              >
                Registrasi
              </Link>
            </li>
            <li className="absolute bottom-5" onClick={logoutHanlder}>
              <button className="block p-2 rounded hover:bg-white hover:text-black hover:font-semibold text-white">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-y-auto w-full p-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
