import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllToko } from "../../api/tokoApi";
import { getAllUser } from "../../api/userApi";
import CardDashboard from "../../components/card/CardDashboard";
import KonfirmasiModal from "../../components/KonfirmasiModal";
import AdminLayout from "../../components/layout/AdminLayout";
import CustomerTable from "../../components/table/CustomerTable";
import VendorTable from "../../components/table/VendorTable";

const HomeAdmin = () => {
  const [tokoData, setTokoData] = useState();
  const [userId, setUserId] = useState();
  const [namaVendor, setNamaVendor] = useState("");
  const [customerData, setCustomerData] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await getAllUser();
        console.log(res);
        const vendor = res.filter((user) => user.role === "vendor");
        const customer = res.filter((user) => user.role === "customer");
        setTokoData(vendor);
        setCustomerData(customer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendor();
  }, []);

  const handleOpen = (id, nama) => {
    setOpen(!open);
    setUserId(id);
    setNamaVendor(nama);
  };

  return (
    <AdminLayout>
      <div className="flex gap-5">
        <CardDashboard title={"Vendor"} count={tokoData?.length} />
        <CardDashboard title={"Customer"} count={customerData?.length} />
      </div>
      <VendorTable data={tokoData} handleOpen={handleOpen} />
      <CustomerTable data={customerData} />

      {open ? (
        <KonfirmasiModal
          close={() => setOpen(false)}
          title={`Apakah anda ingin menonaktifkan vendor ${namaVendor}?`}
          action="Nonaktifkan"
        />
      ) : (
        ""
      )}
    </AdminLayout>
  );
};

export default HomeAdmin;
