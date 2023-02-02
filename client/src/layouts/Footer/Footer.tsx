import React from "react";
//import logo from "../../assets/svg/principal-logo.svg";
//import searchIcon from "../../assets/svg/search.svg";

//import facebookIcon from "../../assets/svg/facebook.svg";
//import shoppingIcon from "../../assets/svg/shopping-bag.svg";

const Footer = () => {
  return (
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
        <div className="flex flex-col space-y-2.5 items-center justify-start w-full">
          <p className="text-lg font-semibold leading-relaxed uppercase">
            Newsletter
          </p>
          <p className="font-family: font-poppins flex justify-center w-full h-1/3 text-xs leading-none">
            Recibí todas las novedades y beneficios exclusivos de la fraternidad
            <br />
          </p>
          <div className="inline-flex space-x-0.5 items-left justify-start">
            <div className="flex items-center justify-start w-40 h-full bg-gray-200">
              <p className="text-xs leading-none text-black text-opacity-50 capitalize">
                {" "}
                Email
              </p>
            </div>
            <div className="inline-flex flex-col items-center justify-center flex-1 h-full py-1 border border-gray-900">
              <p className="text-xs font-semibold leading-none text-center text-gray-900">
                SUBSCRIBIRME
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-200" />
      <p className="font-semibold flex items-center w-32 h-10 text-base  leading-normal">
        © 2023 UNBARDO
      </p>
    </div>
  );
};

export default Footer;
