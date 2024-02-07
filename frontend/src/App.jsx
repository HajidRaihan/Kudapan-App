import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Warung from "./pages/Warung";
import Order from "./pages/Order";
import Transaksi from "./pages/Transaksi";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./middleware/PrivateRoute";
import Keranjang from "./pages/Keranjang";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/warung/:tokoId" element={<Warung />} />
        <Route path="/order" element={<Order />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/keranjang" element={<Keranjang />} />
      </Routes>
    </Router>
  );
}

export default App;
