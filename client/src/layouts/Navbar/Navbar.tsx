import React from 'react';
import searchIcon from "../../assets/svg/search.svg"
import menuIcon from "../../assets/svg/menu-alt-2.svg"
import shoppingBag from "../../assets/svg/shopping-bag.svg"
import logo from "../../assets/svg/principal-logo.svg"

const Navbar = () => {
  return (
  <div className="flex bg-primary h-16 justify-between items-center px-3 border-b-2 border-gray-200">
    <div>
        <img src={menuIcon} alt="menu-icon" className="h-8" />
    </div>

    <div>
        <img src={logo} alt="Logo-UnBardo" className="h-7" />
    </div>
         
    <div className="flex w-16 justify-between">
        <img src={searchIcon} alt="searcg-icon" className="h-7" />
        <img src={shoppingBag} alt="shopping-bag-icon" className="h-7" />
    </div>
  </div>
  );
};

export default Navbar;
