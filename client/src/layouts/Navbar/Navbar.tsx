import React from "react";
import { Link } from "react-router-dom";
import menuIcon from "../../assets/svg/menu-alt-2.svg";
import logo from "../../assets/svg/principal-logo.svg";
import searchIcon from "../../assets/svg/search.svg";
import shoppingIcon from "../../assets/svg/shopping-bag.svg";

const Navbar = ({ handleChange }: any) => {
  return (
    <div className="flex items-center justify-between h-16 px-3 bg-white border-b-2 border-gray-200">
      <div>
        <img
          onClick={handleChange}
          src={menuIcon}
          alt="menu-icon"
          className="h-8"
        />
      </div>

      <div>
        <Link to="/">
          <img src={logo} alt="Logo-UnBardo" className="h-7" />
        </Link>
      </div>

      <div className="flex justify-between w-20">
        <img src={searchIcon} alt="searcg-icon" className="h-7" />
        <Link to="/checkout">
          <img src={shoppingIcon} alt="shopping-bag-icon" className="h-7" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
