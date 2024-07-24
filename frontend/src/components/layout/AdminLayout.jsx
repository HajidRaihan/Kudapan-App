import React from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      <div className="bg-primary w-64 flex-shrink-0">
        <div className="p-4">
          <h2 className="text-primary-foreground text-lg font-semibold mb-4 text-white">
            Navigation
          </h2>
          <ul className="space-y-2">
            <li>
              <Link to={"/admin"} className="block p-2 rounded hover:bg-slate-700 text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/vendor-register"}
                className="block p-2 rounded hover:bg-slate-700 text-white"
              >
                Registrasi
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-y-auto w-full p-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
