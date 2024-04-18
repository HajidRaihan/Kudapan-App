import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Warung from "./pages/Warung";
import Order from "./pages/Order";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./middleware/PrivateRoute";
import Keranjang from "./pages/Keranjang";
import History from "./pages/History";
import HomeVendor from "./pages/vendor/HomeVendor";
import Tes from "./pages/Tes";
import CreateToko from "./pages/CreateToko";
import Pesanan from "./pages/vendor/Pesanan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/warung/:tokoId" element={<Warung />} />
        <Route path="/order" element={<Order />} />
        <Route path="/riwayat" element={<History />} />
        <Route path="/keranjang" element={<Keranjang />} />

        <Route path="/vendor" element={<HomeVendor />} />
        <Route path="/create-toko" element={<CreateToko />} />
        <Route path="/vendor/pesanan" element={<Pesanan />} />
        {/* <Route path="/tes" element={<Tes />} /> */}

        <Route path="*" element={<p>Not found.</p>} />
      </Routes>
    </Router>
  );
}

export default App;
