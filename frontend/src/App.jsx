import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Warung from "./pages/Warung";
import Order from "./pages/Order";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Keranjang from "./pages/Keranjang";
import History from "./pages/History";
import HomeVendor from "./pages/vendor/HomeVendor";
import CreateToko from "./pages/CreateToko";
import Pesanan from "./pages/vendor/Pesanan";
import QrTransaksi from "./pages/QrTransaksi";
import Profile from "./pages/Profile";
import SocketTest from "./pages/SocketTest";
import EditProfile from "./pages/EditProfile";
import Tes from "./pages/Tes";
import { useEffect } from "react";
import DetailPesanan from "./pages/vendor/DetailPesanan";
import Payment from "./pages/Payment";
import ProfileVendor from "./pages/vendor/ProfileVendor";
import VendorRoute from "./middleware/VendorRoute";
import CustomerRoute from "./middleware/CustomerRoute";
import HomeAdmin from "./pages/admin/HomeAdmin";
import RegisVendor from "./pages/admin/RegisVendor";
import AdminRoute from "./middleware/AdminRoute";
import RekapPesanan from "./pages/vendor/RekapPesanan";

function App() {
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mejaValue = searchParams.get("meja");

    if (mejaValue) {
      // Save 'meja' value in cookies
      document.cookie = `meja=${mejaValue}; path=/`;
    }
  }, [location.search]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <CustomerRoute>
              <Home />
            </CustomerRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <CustomerRoute>
              <Profile />
            </CustomerRoute>
          }
        />
        <Route
          path="/warung/:tokoId"
          element={
            <CustomerRoute>
              <Warung />
            </CustomerRoute>
          }
        />
        <Route
          path="/order"
          element={
            <CustomerRoute>
              <Order />
            </CustomerRoute>
          }
        />
        <Route
          path="/riwayat"
          element={
            <CustomerRoute>
              <History />
            </CustomerRoute>
          }
        />
        <Route
          path="/keranjang"
          element={
            <CustomerRoute>
              <Keranjang />
            </CustomerRoute>
          }
        />
        <Route
          path="/payment/:orderId/:userId"
          element={
            <CustomerRoute>
              <Payment />
            </CustomerRoute>
          }
        />
        <Route
          path="/edit/profile"
          element={
            <CustomerRoute>
              <EditProfile />
            </CustomerRoute>
          }
        />

        <Route
          path="/vendor"
          element={
            <VendorRoute>
              <HomeVendor />
            </VendorRoute>
          }
        />
        <Route
          path="/create-toko"
          element={
            <VendorRoute>
              <CreateToko />
            </VendorRoute>
          }
        />
        <Route
          path="/vendor/pesanan"
          element={
            <VendorRoute>
              <Pesanan />
            </VendorRoute>
          }
        />
        <Route
          path="/vendor/profile"
          element={
            <VendorRoute>
              <ProfileVendor />
            </VendorRoute>
          }
        />
        <Route
          path="/vendor/pesanan/:orderId/:userId"
          element={
            <VendorRoute>
              <DetailPesanan />
            </VendorRoute>
          }
        />

        <Route
          path="/vendor/rekap"
          element={
            <VendorRoute>
              <RekapPesanan />
            </VendorRoute>
          }
        />

        {/* admin route */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route path="/admin/vendor-register" element={<RegisVendor />} />

        <Route path="/socket" element={<SocketTest />} />
        <Route path="/tes" element={<Tes />} />

        <Route path="*" element={<p>Not found.</p>} />
      </Routes>
    </Router>
  );
}

export default App;
