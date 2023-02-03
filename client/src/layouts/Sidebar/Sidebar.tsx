import React from "react";
import helpIcon from "../../assets/svg/help.svg";
import outIcon from "../../assets/svg/out-session.svg";
import logo from "../../assets/svg/principal-logo.svg";
import userIcon from "../../assets/svg/user-icon.svg";

interface Props {
  openClose: boolean;
  handleChange: any;
}

const Sidebar = ({ openClose, handleChange }: Props) => {
  let style: string;
  if (openClose) style = "left-full";
  else {
    style = "";
  }

  return (
    <div className={`flex fixed ${style} w-full bg-black/50`}>
      <div className="flex flex-col justify-between w-2/3 max-w-lg min-h-screen bg-white">
        <div>
          <div className="flex items-center justify-center h-16 border-b-2 border-gray-300">
            <img src={logo} alt="logo" className="h-7" />
          </div>

          <div className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer">
            <img src={userIcon} alt="user" className="h-6" />
            <p className="pl-4 text-xl font-semibold">
              <a href="http://localhost:3000/panel/newproduct">
                Crear Producto
              </a>
            </p>
          </div>

          <div className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer">
            <img src={outIcon} alt="out" className="h-6" />
            <p className="pl-4 text-xl font-semibold">Cerrar Sesión</p>
          </div>
        </div>

        <div>
          <div className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer">
            <img src={helpIcon} alt="help" className="h-6" />
            <p className="pl-4 text-xl font-semibold">Ayuda</p>
          </div>
        </div>
      </div>

      <p
        onClick={handleChange}
        className="w-16 h-16 pt-2 text-3xl font-semibold text-center text-white duration-300 bg-black hover:bg-white hover:text-black hover:cursor-pointer"
      >
        x
      </p>
    </div>
  );
};

export default Sidebar;
