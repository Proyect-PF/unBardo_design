import React from "react";
import helpIcon from "../../assets/svg/help.svg";
import outIcon from "../../assets/svg/out-session.svg";
import logo from "../../assets/svg/principal-logo.svg";
import userIcon from "../../assets/svg/user-icon.svg";
import login from "../../assets/svg/log-in.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../state/reducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

interface Props {
  openClose: boolean;
  handleChange: any;
}

const Sidebar = ({ openClose, handleChange }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminLog } = bindActionCreators(actionCreators, dispatch);
  const { adminLogin } = useSelector((state: State) => state.user);

  let style: string;
  if (openClose) style = "left-full";
  else {
    style = "";
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const option: HTMLDivElement = e.currentTarget;
    const { id } = option;

    switch (id) {
      case "login":
        navigate("/account/login");
        handleChange();
        break;
      case "newproduct":
        navigate("/panel");
        handleChange();
        break;
      case "logout":
        adminLog();
        handleChange();
        navigate("/");
        break;
      case "help":
        break;
    }
  };

  return (
    <div
      className={`flex fixed ${style} w-full bg-black/80 z-40  text-2xl font-semibold`}
    >
      <div className="flex flex-col justify-between w-2/3 max-w-lg min-h-screen bg-white">
        <div>
          <div className="flex items-center justify-center h-16 border-b-2 border-gray-300">
            <img src={logo} alt="logo" className="h-7" />
          </div>
          <div className={!adminLogin ? "visible" : "hidden"}>
            <div
              onClick={handleClick}
              id="login"
              className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer"
            >
              <img src={login} alt="user" className="h-6" />
              <p className="pl-4">Iniciar Sesión</p>
            </div>
          </div>
          <div className={adminLogin ? "visible" : "hidden"}>
            <div
              onClick={handleClick}
              id="newproduct"
              className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer"
            >
              <img src={userIcon} alt="user" className="h-6" />
              <p className="pl-4">Crear Producto</p>
            </div>

            <div
              onClick={handleClick}
              id="logout"
              className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer"
            >
              <img src={outIcon} alt="out" className="h-6" />
              <p className="pl-4">Cerrar Sesión</p>
            </div>
          </div>
        </div>

        {/* <div>
                    <div onClick={handleClick} id='help' className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer">
                        <img src={helpIcon} alt="help" className="h-6" />
                        <p className="pl-4 text-xl font-semibold">Ayuda</p>
                    </div>
                </div> */}
      </div>
      <div className="w-1/3" onClick={handleChange}></div>
      {/* <p
        onClick={handleChange}
        className="w-16 h-16 pt-2 text-3xl font-semibold text-center text-white duration-300 hover:bg-white hover:text-black hover:cursor-pointer"
      >
        x
      </p> */}
    </div>
  );
};

export default Sidebar;
