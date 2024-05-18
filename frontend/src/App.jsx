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
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
        <Route path="/vendor/pesanan/:orderId" element={<DetailPesanan />} />
        <Route path="/socket" element={<SocketTest />} />
        <Route path="/tes" element={<Tes />} />

        <Route path="*" element={<p>Not found.</p>} />
      </Routes>
    </Router>
  );
}

export default App;
