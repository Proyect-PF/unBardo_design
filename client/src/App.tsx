import { useState } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AdminP from "./AdminPanel";
import Footer from "./layouts/Footer/Footer";
import Navbar from "./layouts/Navbar/Navbar";
import Searchbar from "./layouts/Searchbar/Searchbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Page404 from "./Pages/404";
import Checkout from "./Pages/Checkout/Checkout";
import OrderDetails from "./Pages/Checkout/OrdersDetails";
import Payment from "./Pages/Checkout/Payment";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home/Home";
import Newsletter from "./Pages/NewsLetter";
import Profile from "./Pages/Profile/Profile";
import LogInPage from "./Pages/SignIn";
import RegisterPage from "./Pages/SignUp";
import robot from "./assets/svg/googleIcons/robot.svg";
import ChatBotComponent from "./components/ChatBot";
import Favorites from "./Pages/Favorites/Favorites";

function App() {
  const [openClose, setOpenClose] = useState(true);
  const [search, setSearch] = useState(true);
  const [checkout, setCheckout] = useState(true);
  const [chatbot, setChatbot] = useState(false);

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
  const handleCheckout = () => {
    if (!checkout) setCheckout(true);
    else {
      setCheckout(false);
    }
  };
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Searchbar openClose={search} handleSearch={handleSearch} />
        <Sidebar openClose={openClose} handleChange={handleChange} />
        <Navbar
          handleChange={handleChange}
          handleSearch={handleSearch}
          handleCheckout={handleCheckout}
        />
        <Checkout openClose={checkout} handleCheckout={handleCheckout} />
        <div className="pt-28">
          {chatbot ? (
            <div
              className="fixed z-30 w-full h-screen"
              onClick={() => setChatbot(false)}
            />
          ) : null}
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:name" element={<Details />} />
            <Route path="/account/login" element={<LogInPage />} />
            <Route path="/account/register" element={<RegisterPage />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/checkout/payment" element={<Payment />} />
            <Route path="/orders/feedback" element={<OrderDetails />} />
            <Route path="/profile/:panel" element={<Profile />} />
            <Route path="/newsletter" element={<Newsletter />} />
            {/* <Route path="/panel/newproduct" element={<NewProductForm />} /> */}
            <Route path="/panel" element={<AdminP />} />
          </Routes>
        </div>

        <div className="fixed z-40 right-8 bottom-24">
          {chatbot ? <ChatBotComponent /> : null}
        </div>
        <div className="fixed z-40 right-4 bottom-6">
          <img
            src={robot}
            className="w-12 h-auto"
            onClick={() => (chatbot ? setChatbot(false) : setChatbot(true))}
            alt="chatbot"
          />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
