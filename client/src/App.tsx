import React from "react";

import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer";
import Home from "./Pages/Home/Home";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Details from "./Pages/Details/Details";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="*" element={<div>404</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Details />} />
          <Route path="/account/login" element={<div>Login</div>} />
          <Route path="/account/panel" element={<div>Admin Panel</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
