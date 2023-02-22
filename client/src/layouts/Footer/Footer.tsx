import React from "react";
import email from "../../assets/svg/googleIcons/email.svg";
import logofooter from "../../assets/png/Bardo-frase.png";
import instagram from "../../assets/svg/googleIcons/instagram.svg";
import whatsapp from "../../assets/svg/googleIcons/whatsapp.svg";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/panel" && (
        <div className="flex flex-col items-start mt-14">
          <div className="flex flex-row justify-center w-full ">
            <img src={logofooter} className="w-60 " alt="Logo segundario" />
          </div>
          <div className="flex flex-col gap-4 m-5 mt-8 ">
            <p className="text-2xl font-bold">CONTACTO</p>
            <div className="flex flex-row gap-2 font-medium">
              <img src={email} className="h-6" alt="mail" />
              <p> unbardodesign@gmail.com</p>
            </div>
            <div className="flex flex-row gap-2 font-medium">
              <img src={instagram} className="h-6" alt="instagram" />
              <a href="https://www.instagram.com/unbardo.design/">
                @unbardo.design
              </a>
            </div>
            <div className="flex flex-row gap-2 font-medium">
              <img src={whatsapp} className="h-6" alt="Whatsapp" />
              <a href="https://wa.me/5491136126072"> +54 9 11 3612-6072</a>
            </div>
          </div>
          <div className="w-full py-4 text-center ">
            <p>© 2023 UNBARDO</p>
            <a href="https://github.com/Proyect-PF" className="text-gray-400 ">
              Developed by notHenry
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
