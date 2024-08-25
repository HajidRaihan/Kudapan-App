import React, { useEffect } from "react";
import FormatRupiah from "../../helper/FormatRupiah";
import { ShutDown } from "@styled-icons/remix-line/ShutDown";
import { styled } from "styled-components";

const StyledShutdown = styled(ShutDown)`
  color: #fff;
  width: 15px;
`;
const StyledShutdownGreen = styled(ShutDown)`
  color: #02f760;
  width: 15px;
`;

const CustomerTable = ({ data, handleOpen }) => {
  useEffect(() => {
    console.log(import.meta.env.VITE_IMGURL);
  }, []);
  return (
    <div className="w-full bg-white p-8 mt-10 rounded-lg shadow-lg">
      <h1 className="font-bold">List Customer</h1>

      <div className="overflow-x-auto border rounded-lg mt-5 bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((customer, index) => (
              <tr key={customer._id}>
                <th>{index + 1}</th>
                <td>{customer.nama}</td>
                <td>{customer.email}</td>
                <td>
                  <FormatRupiah value={customer.saldo} />
                </td>
                <td>
                  {customer.status === "aktif" ? (
                    <button
                      className="text-white w-10 h-10 rounded-md hover:opacity-85 bg-green-400"
                      onClick={() => handleOpen(customer._id, customer.nama, customer.status)}
                    >
                      <StyledShutdown />
                    </button>
                  ) : (
                    <button
                      className="text-white w-10 h-10 rounded-md hover:opacity-85 bg-primary"
                      onClick={() => handleOpen(customer._id, customer.nama, customer.status)}
                    >
                      <StyledShutdown />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
