import React from "react";
//import logo from "../../assets/svg/principal-logo.svg";
//import searchIcon from "../../assets/svg/search.svg";

//import facebookIcon from "../../assets/svg/facebook.svg";
//import shoppingIcon from "../../assets/svg/shopping-bag.svg";

const Footer = () => {
  return (
    <div className="flex flex-col items-start border-t-2 mt-14">
      <div className="flex flex-col gap-4 m-5 uppercase">
        <p className="text-lg font-bold">Contacto</p>
        <div className="flex flex-col gap-2 text-sm font-semibold">
          <p>AV. Falsa 123, Palermo, C.a.b.a.</p>
          <p>unbardo@gmail.com</p>
          <p>tel: +54 11 123 1234</p>
    <div className="font-family: font-poppins flex flex-col space-y-4 items-center justify-start py-4 bg-white">  
      <div className="w-full h-0.5 bg-gray-200" />
      
      <div className="flex flex-col space-y-5 items-left justify-start w-5/6">
        <div className="font-family: font-poppins flex flex-col space-y-2.5 items-center justify-start">
          <p className="text-lg font-semibold leading-relaxed uppercase">
            Contacto
          </p>
          <div className="flex flex-col space-y-2.5 items-left justify-start">
            <p className="text-xs leading-none uppercase">
              av. falsa 123, Palermo, C.a.b.a.
            </p>
            <p className="text-xs leading-none uppercase">unbardo@gmail.com</p>
            <p className="text-xs leading-none uppercase">
              tel: +54 11 123 1234
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 m-5 uppercase">
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
          <button className="px-4 py-1 text-sm font-semibold text-center border-2 border-black">
            SUBSCRIBIRME
          </button>
        </div>
      </div>
      <p className="w-full py-4 text-center border-t-2">© 2023 UNBARDO</p>
    </div>
  );
};

export default Footer;
