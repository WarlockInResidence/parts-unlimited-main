import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./Pages/Inventory";
import Order from "./Pages/Order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
