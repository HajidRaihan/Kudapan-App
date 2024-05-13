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

function App() {
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
        <Route path="/transaksi" element={<QrTransaksi />} />
        <Route path="/edit/profile" element={<EditProfile />} />

        <Route path="/vendor" element={<HomeVendor />} />
        <Route path="/create-toko" element={<CreateToko />} />
        <Route path="/vendor/pesanan" element={<Pesanan />} />
        <Route path="/socket" element={<SocketTest />} />
        {/* <Route path="/tes" element={<Tes />} /> */}

        <Route path="*" element={<p>Not found.</p>} />
      </Routes>
    </Router>
  );
}

export default App;
