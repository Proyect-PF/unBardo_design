import React from 'react';
import menuIcon from '../../assets/svg/menu-alt-2.svg';
import logo from '../../assets/svg/principal-logo.svg';
import searchIcon from '../../assets/svg/search.svg';
import shoppingIcon from '../../assets/svg/shopping-bag.svg'

const Navbar = ({handleChange}: any) => {
  return (
    <div className="flex bg-white h-16 justify-between items-center px-3 border-b-2 border-gray-200">
      <div>
            <img onClick={handleChange} src={menuIcon} alt="menu-icon" className="h-8" />
        </div>

        <div>
            <img src={logo} alt="Logo-UnBardo" className="h-7" />
        </div>
         
        <div className="flex w-20 justify-between">
            <img src={searchIcon} alt="searcg-icon" className="h-7" />
            <img src={shoppingIcon} alt="shopping-bag-icon" className="h-7" />
        </div>
    </div>
  );
};

export default Navbar;
