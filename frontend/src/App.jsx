import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Warung from "./pages/Warung";
import Order from "./pages/Order";
import Transaksi from "./pages/Transaksi";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/warung" element={<Warung />} />
        <Route path="/order" element={<Order />} />
        <Route path="/transaksi" element={<Transaksi />} />
      </Routes>
    </Router>
  );
}

export default App;
