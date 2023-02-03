import React, { useState } from "react";

import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer";
import Home from "./Pages/Home/Home";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Details from "./Pages/Details/Details";
import LogIn from "./Pages/LogIn/LogIn";
import Checkout from "./Pages/Checkout/Checkout";

function App() {
  const [openClose, setOpenClose] = useState(true);

  const handleChange = () => {
    if (!openClose) setOpenClose(true);
    else {
      setOpenClose(false);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Sidebar openClose={openClose} handleChange={handleChange} />
        <Navbar handleChange={handleChange} />
        <Routes>
          <Route path="*" element={<div>404</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:name" element={<Details />} />
          <Route path="/account/login" element={<LogIn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/panel" element={<div>Admin Panel</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
