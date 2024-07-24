import React from "react";
import { ShutDown } from "@styled-icons/remix-line/ShutDown";
import { styled } from "styled-components";
import FormatRupiah from "../../helper/FormatRupiah";

const StyledShutdown = styled(ShutDown)`
  color: #fff;
  width: 15px;
`;

const VendorTable = ({ data, handleOpen }) => {
  return (
    <div className="w-full bg-white p-8 mt-10 rounded-lg shadow-lg">
      <h1 className="font-bold">List Vendor</h1>

      <div className="overflow-x-auto border rounded-lg mt-5 bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Saldo</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((vendor, index) => (
              <tr key={vendor._id}>
                <th>{index + 1}</th>
                <td>{vendor.nama}</td>
                <td>{vendor.email}</td>
                <td>
                  <FormatRupiah value={vendor.saldo} />
                </td>
                <td>
                  <button
                    className="text-white w-10 h-10 rounded-md hover:opacity-85 bg-primary"
                    onClick={() => handleOpen(vendor._id, vendor.nama)}
                  >
                    <StyledShutdown />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorTable;
