import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import menuIcon from "../../assets/svg/menu-alt-2.svg";
import logo from "../../assets/svg/principal-logo.svg";
import searchIcon from "../../assets/svg/search.svg";
import shoppingIcon from "../../assets/svg/shopping-bag.svg";
import { State } from "../../state/reducers";

const Navbar = ({ handleChange, handleSearch }: any) => {
  const location = useLocation()
  const { checkoutList } = useSelector((state: State) => state.checkout);
  return (
    <div className="flex relative items-center justify-between h-16 px-3 bg-white border-b-2 border-gray-200">
      <div>
        <img
          onClick={handleChange}
          src={menuIcon}
          alt="menu-icon"
          className="h-8 cursor-pointer"
        />
      </div>

      <div>
        <Link to="/">
          <img src={logo} alt="Logo-UnBardo" className="h-7" />
        </Link>
      </div>

      <div className="flex cursor-pointer w-16 justify-between">
        <img
          onClick={handleSearch}
          src={searchIcon}
          alt="searcg-icon"
          className="h-7"
        />
        <Link to="/checkout">
          <img src={shoppingIcon} alt="shopping-bag-icon" className="h-7" />
        </Link>
      </div>
      <div className={`absolute right-1 top-2 bg-red-600 h-5 w-5 rounded-full ${checkoutList.length? null: "hidden"} ${location.pathname === "/checkout"? "hidden": null}`}>
        <Link to="/checkout">
          <p className="text-center text-xs font-bold text-white pt-0.5">{checkoutList.length}</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
