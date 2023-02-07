import React from "react";
//import logo from "../../assets/svg/principal-logo.svg";
//import searchIcon from "../../assets/svg/search.svg";

//import facebookIcon from "../../assets/svg/facebook.svg";
//import shoppingIcon from "../../assets/svg/shopping-bag.svg";

const Footer = () => {
  return (
    <div className="flex flex-col items-start border-t-2 mt-14">
      <div className="flex flex-col gap-4 m-5 uppercase">
        <p className="text-2xl font-bold">Contacto</p>
        <div className="flex flex-col gap-2 text-xl font-medium">
          <p>AV. Falsa 123, Palermo, C.a.b.a.</p>
          <p>unbardo@gmail.com</p>
          <p>tel: +54 11 123 1234</p>
        </div>
      </div>
      {/* <div className="flex flex-col gap-4 m-5 uppercase">
        <p className="text-lg font-bold">Newsletter</p>
        <p className="text-sm font-semibold">
          Recibí todas las novedades y beneficios exclusivos de la fraternidad
        </p>
        <div className="flex gap-8">
          <input
            type="text"
            placeholder="Email..."
            className="pl-4 text-sm text-opacity-50 bg-gray-200 w-80"
          />
          <button className="px-4 py-1 text-sm text-center border-2 border-black">
            SUBSCRIBIRME
          </button>
        </div>
      </div> */}
      <p className="w-full py-4 text-2xl text-center border-t-2">
        © 2023 UNBARDO
      </p>
    </div>
  );
};

export default Footer;
