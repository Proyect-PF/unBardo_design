import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import arrow from "../../assets/svg/come-back.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { State } from "../../state/reducers";

const Profile = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userId, userToken, userInfo, userType } = useSelector(
    (state: State) => state.user
  );
  const [show, setShow] = useState({
    data: false,
    orders: false,
    favs: false,
    settings: false,
  });

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-6 m-4 mt-6">
      <div
        className="flex justify-between"
        onClick={() => setShow({ ...show, data: show.data ? false : true })}
      >
        <p className="text-2xl font-medium">Datos Personales:</p>
        <img src={arrow} className={show.data ? "rotate-90" : "-rotate-90"} />
      </div>
      {show.data && (
        <div className="mx-4 text-lg">
          <h1>Tu nombre: {userInfo}</h1>
          <h1>Tu id: {userId}</h1>
          <h1>Tu rol: {userType}</h1>
        </div>
      )}
      {/* <div
        className="flex justify-between"
        onClick={() => setShow({ ...show, orders: show.orders ? false : true })}
      >
        <p className="text-2xl font-medium">Mis Ordenes:</p>
        <img src={arrow} className={show.orders ? "rotate-90" : "-rotate-90"} />
      </div>
      {show.orders && (
        <div className="mx-4 text-lg">
          <h1>Info de la orden</h1>
        </div>
      )}
      <div
        className="flex justify-between"
        onClick={() => setShow({ ...show, favs: show.favs ? false : true })}
      >
        <p className="text-2xl font-medium">Mis Favoritos:</p>
        <img src={arrow} className={show.favs ? "rotate-90" : "-rotate-90"} />
      </div>
      {show.favs && (
        <div className="mx-4 text-lg">
          <h1>Info de favoritos</h1>
        </div>
      )}
      <div
        className="flex justify-between"
        onClick={() =>
          setShow({ ...show, settings: show.settings ? false : true })
        }
      >
        <p className="text-2xl font-medium">Ajustes:</p>
        <img
          src={arrow}
          className={show.settings ? "rotate-90" : "-rotate-90"}
        />
      </div>
      {show.settings && (
        <div className="mx-4 text-lg">
          <h1>Cambiar contraseña</h1>
        </div>
      )} */}
    </div>
  );
};

export default Profile;
