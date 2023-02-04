import { useState } from "react";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NewProduct from "./components/NewProduct/NewProduct";
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home/Home";
import LogIn from "./Pages/LogIn/LogIn";
import Checkout from "./Pages/Checkout/Checkout";

import Searchbar from "./layouts/Searchbar/Searchbar";

function App() {
  const [openClose, setOpenClose] = useState(true);
  const [search, setSearch] = useState(true);

  const handleChange = () => {
    if (!openClose) setOpenClose(true);
    else {
      setOpenClose(false);
    }
  };

  const handleSearch = () => {
    if (!search) setSearch(true);
    else {
      setSearch(false);
    }
  };

  return (
    <div className=" font-poppins">
      <BrowserRouter>
        <Searchbar openClose={search} handleSearch={handleSearch} />
        <Sidebar openClose={openClose} handleChange={handleChange} />
        <Navbar handleChange={handleChange} handleSearch={handleSearch} />
        <Routes>
          <Route path="*" element={<div>404</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:name" element={<Details />} />
          <Route path="/account/login" element={<LogIn />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/panel" element={<div>Admin Panel</div>} />
          <Route path="/panel/newproduct" element={<NewProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
