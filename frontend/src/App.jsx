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
import QrPesanan from "./pages/vendor/QrPesanan";
import Payment from "./pages/Payment";
import ProfileVendor from "./pages/vendor/ProfileVendor";
import VendorRoute from "./middleware/VendorRoute";
import CustomerRoute from "./middleware/CustomerRoute";
import HomeAdmin from "./pages/admin/HomeAdmin";
import RegisVendor from "./pages/admin/RegisVendor";
import AdminRoute from "./middleware/AdminRoute";
import RekapPesanan from "./pages/vendor/RekapPesanan";
import DetailPesanan from "./pages/vendor/DetailPesanan";
import LoginVendor from "./pages/vendor/LoginVendor";

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
        <Route path="/login/vendor" element={<LoginVendor />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/warung/:tokoId" element={<Warung />} />
        <Route path="/order" element={<Order />} />
        <Route path="/riwayat" element={<History />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/payment/:orderId/:userId" element={<Payment />} />
        <Route path="/edit/profile" element={<EditProfile />} />

        <Route path="/vendor" element={<HomeVendor />} />
        <Route path="/create-toko" element={<CreateToko />} />
        <Route path="/vendor/pesanan" element={<Pesanan />} />
        <Route path="/vendor/profile" element={<ProfileVendor />} />
        <Route
          path="/vendor/pesanan/barcode/:orderId/:userId"
          element={
            <VendorRoute>
              <QrPesanan />
            </VendorRoute>
          }
        />

        <Route path="/vendor/pesanan/detail/:orderId/:userId" element={<DetailPesanan />} />

        <Route path="/vendor/rekap" element={<RekapPesanan />} />

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
