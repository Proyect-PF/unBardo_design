import { useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
// import NewProductForm from "./components/NewProduct/NewProductForm";
import AdminP from "./AdminPanel";
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar/Navbar";
import Searchbar from "./layouts/Searchbar/Searchbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Checkout from "./Pages/Checkout/Checkout";
import OrderDetails from "./Pages/Checkout/OrdersDetails";
import Payment from "./Pages/Checkout/Payment";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import UserSignPage from "./Pages/UserSignPage/UserSignPage";

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
    <div className=" font-rift">
      <BrowserRouter>
        <Searchbar openClose={search} handleSearch={handleSearch} />
        <Sidebar openClose={openClose} handleChange={handleChange} />
        <Navbar handleChange={handleChange} handleSearch={handleSearch} />
        <Routes>
          <Route path='*' element={<div>404</div>} />
          <Route path='/' element={<Home />} />
          <Route path='/product/:name' element={<Details />} />
          <Route path='/account/login' element={<UserSignPage />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/payment' element={<Payment />} />
          <Route path='/orders/feedback' element={<OrderDetails />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/panel/newproduct" element={<NewProductForm />} /> */}
          <Route path="/panel" element={<AdminP />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
