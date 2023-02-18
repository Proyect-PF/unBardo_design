import React from "react";
import email from "../../assets/svg/googleIcons/email.svg";
import logofooter from "../../assets/svg/googleIcons/logofooter.svg";
import instagram from "../../assets/svg/googleIcons/instagram.svg";
import whatsapp from "../../assets/svg/googleIcons/whatsapp.svg";

const Footer = () => {
  return (
    <div className="flex flex-col items-start mt-14">
      <div className="flex flex-col w-full gap-4">
        <img src={logofooter} className="justify-center h-40" />
      </div>
      <div className="flex flex-col gap-4 m-5 mt-8 ">
        <p className="text-2xl font-bold">CONTACTO</p>
        <div className="flex flex-row gap-2 font-medium">
          <img src={email} className="h-6" />
          <p> unbardodesign@gmail.com</p>
        </div>
        <div className="flex flex-row gap-2 font-medium">
          <img src={instagram} className="h-6" />
          <a href="https://www.instagram.com/unbardo.design/">
            @unbardo.design
          </a>
        </div>
        <div className="flex flex-row gap-2 font-medium">
          <img src={whatsapp} className="h-6" />
          <a href="https://wa.me/5491136126072"> +54 9 11 3612-6072</a>
        </div>
      </div>
      <p className="w-full py-4 text-center ">© 2023 UNBARDO</p>
    </div>
  );
};

export default Footer;
