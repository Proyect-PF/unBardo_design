import { request } from "http";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastClassName } from "react-toastify";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { State } from "../../state/reducers";

const Profile = (): JSX.Element => {
  const { panel } = useParams();
  return (
    <div>
      <div className={panel === "profile" ? "visible" : "hidden"}>
      <div className="flex flex-col justify-between">
        <h1>Nombre completo: NombreDelUsuario</h1>
        <h1>Correo: CorreoDelUsuario </h1>
        <h1>Pais: Argentina </h1>
        <h1>Provincia: Buenos Aires</h1>
        <h1>Ciudad: La Plata</h1>
        <h1>Codigo Postal: 1900</h1>
      </div>
      </div>
      <div className={panel === "orders" ? "visible" : "hidden"}>
        <h1>Ordenes</h1>
      </div>
    </div>
  );
};

export default Profile;
