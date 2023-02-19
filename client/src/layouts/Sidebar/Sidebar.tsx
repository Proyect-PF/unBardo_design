import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import login from "../../assets/svg/googleIcons/login.svg";
import outIcon from "../../assets/svg/googleIcons/logout.svg";
import logo from "../../assets/svg/principal-logo.svg";
import userIcon from "../../assets/svg/googleIcons/account.svg";
import heart from "../../assets/svg/googleIcons/favorite.svg";
import { actionCreators } from "../../state";
import { State } from "../../state/reducers";

interface Props {
  openClose: boolean;
  handleChange: any;
}

const Sidebar = ({ openClose, handleChange }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLogout, logOutFavorites } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const { success, userType } = useSelector((state: State) => state.user);

  let style: string;
  if (openClose) style = "translate-x-[-100%]";
  else {
    style = "translate-x-[0%]";
  }

  let style1: string;
  if (openClose) style1 = "opacity-0 invisible";
  else {
    style1 = "opacity-1 visible";
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
      case "panel":
        navigate("/panel");
        handleChange();
        break;
      case "logout":
        userLogout();
        logOutFavorites();
        handleChange();
        navigate("/");
        break;
      case "profile":
        handleChange();
        navigate(`/profile/${id}`);
        break;
      case "favorites":
        handleChange();
        navigate(`/favorites`);
        break;
      case "help":
        break;
    }
  };

  return (
    <div
      className={`flex fixed ${style1} ease-in-out duration-500 w-full bg-black/80 z-40  text-xl font-semibold`}
    >
      <div className={`flex flex-col ${style} ease-in-out duration-500 justify-between w-2/3 max-w-lg min-h-screen bg-white`}>
        <div>
          <div className="flex items-center justify-center h-16 border-b-2 border-gray-300">
            <img src={logo} alt="logo" className="h-7" />
          </div>

          {/** INICIAR SESION */}
          <div className={!success ? "visible" : "hidden"}>
            <div
              onClick={handleClick}
              id="login"
              className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer"
            >
              <img src={login} alt="user" className="h-8" />
              <p className="pl-4">Iniciar Sesión</p>
            </div>
          </div>

          {/** OPCIONES */}
          <div className={success || success ? "visible" : "hidden"}>
            <div
              onClick={handleClick}
              id={
                success && userType === "admin"
                  ? "panel"
                  : success && userType === "user"
                  ? "profile"
                  : ""
              }
              className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer"
            >
              <img src={userIcon} alt="user" className="h-8" />
              <p className="pl-4">
                {success && userType === "admin"
                  ? "Panel Admin"
                  : success && userType === "user"
                  ? "Mi perfil"
                  : ""}
              </p>
            </div>
            {/** FAVORITOS */}
            <div
              onClick={handleClick}
              id="favorites"
              className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer"
            >
              <img src={heart} alt="Favorites" className="h-8" />
              <p className="pl-4">Favoritos</p>
            </div>
            {/** CERRAR SESION */}
            <div
              onClick={handleClick}
              id="logout"
              className="flex items-center h-16 pl-5 duration-300 border-l-4 border-white hover:border-l-4 hover:border-gray-700 hover:bg-gray-300 hover:cursor-pointer"
            >
              <img src={outIcon} alt="out" className="h-8" />
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
