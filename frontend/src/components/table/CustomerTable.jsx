import React, { useEffect } from "react";
import FormatRupiah from "../../helper/FormatRupiah";

const CustomerTable = ({ data }) => {
  useEffect(() => {
    console.log(import.meta.env.VITE_IMGURL);
  }, []);
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
