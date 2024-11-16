import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { getAllToko } from "../../api/tokoApi";
import {
  changeStatusUser,
  changeStatusVendor,
  convertUserCsv,
  deleteUser,
  deleteVendor,
  getAllUser,
  getAllVendor,
} from "../../api/userApi";
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
  const [konfirmasiModalOpen, setKonfirmasiModalOpen] = useState(false);
  const [konfirmasiModalVendorOpen, setKonfirmasiModalVendorOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  const handleDeleteModalOpenUser = (id, nama) => {
    setKonfirmasiModalOpen(true);
    setUserId(id);
    setNamaCust(nama);
  };

  const handleDeleteModalOpenVendor = (id, nama) => {
    setKonfirmasiModalVendorOpen(true);
    console.log({ id });
    setUserId(id);
    setNamaVendor(nama);
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

  const deleteVendorHandler = async () => {
    setDeleteLoading(true);
    try {
      const res = await deleteVendor(userId);
      toast.success("success menghapus vendor");
      setTokoData(
        tokoData
          .filter((vendor) => vendor._id !== userId)
          .map((vendor) => {
            return { ...vendor };
          })
      );
      console.log(res);
      setDeleteLoading(false);

      setKonfirmasiModalVendorOpen(false);
    } catch (err) {
      console.error(err);
      setDeleteLoading(false);

      toast.error("gagal menghapus vendor");
    }
  };

  const deleteUserHandler = async () => {
    setDeleteLoading(true);
    try {
      const res = await deleteUser(userId);
      toast.success("success menghapus user");
      setCustomerData(
        customerData
          .filter((user) => user._id !== userId)
          .map((user) => {
            return { ...user };
          })
      );
      console.log(res);
      setKonfirmasiModalOpen(false);
      setDeleteLoading(false);
    } catch (err) {
      console.error(err);
      setDeleteLoading(false);

      toast.error("gagal menghapus user");
    }
  };

  const convertToCSV = (jsonData) => {
    return jsonData
      .map((row) => {
        const filteredRow = {
          _id: row._id,
          nama: row.nama,
          email: row.email,
        };
        return Object.values(filteredRow)
          .map((value) => (value !== null ? value : ""))
          .join("|"); // Menggunakan delimiter '|'
      })
      .join("\n");
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(customerData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `user.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCSVVendor = () => {
    const csvData = convertToCSV(tokoData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `user.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <Toaster />
      {/* <button onClick={downloadCSV}>convert</button>
      <button onClick={downloadCSVVendor}>convert vendor</button> */}
      <div className="flex gap-5">
        <CardDashboard title={"Vendor"} count={tokoData?.length} />
        <CardDashboard title={"Customer"} count={customerData?.length} />
      </div>

      <VendorTable
        data={tokoData}
        handleOpen={handleOpenVendor}
        deleteModalOpen={handleDeleteModalOpenVendor}
      />
      <CustomerTable
        data={customerData}
        handleOpen={handleOpen}
        deleteModalOpen={handleDeleteModalOpenUser}
      />
      {openVendor ? (
        <KonfirmasiModal
          close={() => setOpenVendor(false)}
          title={`Apakah anda ingin mengubah status vendor ${namaVendor}?`}
          action="Ubah Status"
          handler={changeStatusVendorHandler}
        />
      ) : null}
      {open ? (
        <KonfirmasiModal
          close={() => setOpen(false)}
          title={`Apakah anda ingin mengubah status vendor ${namaCust}?`}
          action="Ubah Status"
          handler={changeStatusHandler}
        />
      ) : null}
      {konfirmasiModalVendorOpen ? (
        <KonfirmasiModal
          close={() => setKonfirmasiModalVendorOpen(false)}
          title={`Apakah anda ingin menghapus vendor ${namaVendor}?`}
          action="Hapus"
          handler={deleteVendorHandler}
          isLoading={deleteLoading}
        />
      ) : null}
      {konfirmasiModalOpen ? (
        <KonfirmasiModal
          close={() => setKonfirmasiModalOpen(false)}
          title={`Apakah anda ingin menghapus user ${namaCust}?`}
          action="Hapus"
          handler={deleteUserHandler}
          isLoading={deleteLoading}
        />
      ) : null}
    </AdminLayout>
  );
};

export default HomeAdmin;
