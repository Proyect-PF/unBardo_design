import React, { useState } from "react";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NewProduct from "./components/NewProduct/NewProduct";
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home/Home";

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
          <Route path="/account/login" element={<div>Login</div>} />
          <Route path="/account/panel" element={<div>Admin Panel</div>} />
          <Route path="/panel/newproduct" element={< NewProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
