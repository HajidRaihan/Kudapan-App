import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { getAllToko } from "../../api/tokoApi";
import { changeStatusUser, changeStatusVendor, getAllUser, getAllVendor } from "../../api/userApi";
import CardDashboard from "../../components/card/CardDashboard";
import KonfirmasiModal from "../../components/KonfirmasiModal";
import AdminLayout from "../../components/layout/AdminLayout";
import CustomerTable from "../../components/table/CustomerTable";
import VendorTable from "../../components/table/VendorTable";

const HomeAdmin = () => {
  const [tokoData, setTokoData] = useState();
  const [userId, setUserId] = useState();
  const [namaVendor, setNamaVendor] = useState("");
  const [namaCust, setNamaCust] = useState("");
  const [customerData, setCustomerData] = useState();
  const [currStatus, setCurrStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAllUser();
        console.log(res);

        setCustomerData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await getAllVendor();
        console.log(res);

        setTokoData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendor();
  }, []);

  const handleOpen = (id, nama, status) => {
    setOpen(!open);
    setUserId(id);
    setNamaCust(nama);
    setCurrStatus(status);
    console.log("ini status current", { status });
  };

  const handleOpenVendor = (id, nama, status) => {
    setOpenVendor(!open);
    setUserId(id);
    setNamaVendor(nama);
    setCurrStatus(status);
    console.log("ini status current", { status });
  };

  const changeStatusHandler = async () => {
    let newStatus = currStatus === "aktif" ? "nonaktif" : "aktif";

    const data = {
      status: newStatus,
    };

    try {
      const res = await changeStatusUser(userId, data);
      toast.success("success mengubah status vendor");

      setCustomerData((prevData) =>
        prevData.map((customer) =>
          customer._id === userId ? { ...customer, status: newStatus } : customer
        )
      );
      setOpen(false);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const changeStatusVendorHandler = async () => {
    let newStatus = currStatus === "aktif" ? "nonaktif" : "aktif";

    const data = {
      status: newStatus,
    };

    try {
      const res = await changeStatusVendor(userId, data);
      toast.success("success mengubah status vendor");

      setTokoData((prevData) =>
        prevData.map((vendor) =>
          vendor._id === userId ? { ...vendor, status: newStatus } : vendor
        )
      );
      setOpenVendor(false);
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
      <VendorTable data={tokoData} handleOpen={handleOpenVendor} />
      <CustomerTable data={customerData} handleOpen={handleOpen} />

      {openVendor ? (
        <KonfirmasiModal
          close={() => setOpenVendor(false)}
          title={`Apakah anda ingin mengubah status vendor ${namaVendor}?`}
          action="Ubah Status"
          handler={changeStatusVendorHandler}
        />
      ) : (
        ""
      )}

      {open ? (
        <KonfirmasiModal
          close={() => setOpen(false)}
          title={`Apakah anda ingin mengubah status vendor ${namaCust}?`}
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
