import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { getAllToko } from "../../api/tokoApi";
import { changeStatusUser, getAllUser } from "../../api/userApi";
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
  const [currStatus, setCurrStatus] = useState("");
  const [status, setStatus] = useState();
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

  const handleOpen = (id, nama, status) => {
    setOpen(!open);
    setUserId(id);
    setNamaVendor(nama);
    setCurrStatus(status);
    console.log("ini status current", { status });
  };

  const changeStatusHandler = async () => {
    let newStatus = currStatus === "aktif" ? "nonaktif" : "aktif";

    // if (currStatus === "aktif") {
    //   status = "nonaktif";
    // } else if (currStatus === "nonaktif") {
    //   status = "aktif";
    // }

    // return console.log("data status", { newStatus });

    const data = {
      status: newStatus,
    };

    try {
      const res = await changeStatusUser(userId, data);
      toast.success("success mengubah status vendor");

      setTokoData((prevData) =>
        prevData.map((vendor) =>
          vendor._id === userId ? { ...vendor, status: newStatus } : vendor
        )
      );
      setOpen(false);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <Toaster />
      <div className="flex gap-5">
        <CardDashboard title={"Vendor"} count={tokoData?.length} />
        <CardDashboard title={"Customer"} count={customerData?.length} />
      </div>
      <VendorTable data={tokoData} handleOpen={handleOpen} />
      <CustomerTable data={customerData} />

      {open ? (
        <KonfirmasiModal
          close={() => setOpen(false)}
          title={`Apakah anda ingin mengubah status vendor ${namaVendor}?`}
          action="Ubah Status"
          handler={changeStatusHandler}
        />
      ) : (
        ""
      )}
    </AdminLayout>
  );
};

export default HomeAdmin;
