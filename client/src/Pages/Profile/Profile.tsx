import { request } from "http";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastClassName } from "react-toastify";
import { bindActionCreators } from "redux";
import arrow from "../../assets/svg/come-back.svg";
import { State } from "../../state/reducers";
import axios from "axios";
import { PORT, baseURL } from "../../utils/url&port";

const Profile = (): JSX.Element => {
  const { panel } = useParams();
  const { userId } = useSelector((state: State) => state.user);
  const { allOrders } = useSelector((state: State) => state.orders);

  type Orden = {
    orderDetails: {
      id: 0;
      fullname: "";
      status: "";
      dispatched: false;
      updatedAt: "";
      email: "";
      orderProducts: [
        {
          id: 0;
          id_product: 0;
          sizes: {};
        }
      ];
    };
  };

  const getOrdenes = (userId: number) => {
    return axios
      .get(`${baseURL}:${PORT}/orders/users/${userId}`)
      .then((response) => {
        return response.data;
      });
  };

  async function fetchOrders(userId: number) {
    const orders = await getOrdenes(userId);
    // handle orders here
  }

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
        {
          getOrdenes(userId).then((orders) => {
              orders.map((orden : Orden) => {
                orden.orderDetails.id;
              })
          })};
      </div>
    </div>
  );
};

export default Profile;
