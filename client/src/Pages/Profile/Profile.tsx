import { State } from "../../state/reducers";
import axios from "axios";
import { PORT, baseURL } from "../../utils/url&port";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

type Orden = {
  orderDetails: {
    id: number;
    fullname: string;
    status: string;
    dispatched: boolean;
    updatedAt: string;
    email: string;
    orderProducts: [
      {
        id: number;
        id_product: number;
        sizes: {};
      }
    ];
  };
};

const Profile = (): JSX.Element => {
  const { panel } = useParams();
  const { userId } = useSelector((state: State) => state.user);
  const [orders, setOrders] = useState<Orden[]>([]);

  const getOrdenes = (userId: number) => {
    return axios
      .get(`${baseURL}:${PORT}/orders/users/${userId}`)
      .then((response) => {
        return response.data;
      });
  };

  useEffect(() => {
    async function fetchOrders() {
      const orders = await getOrdenes(userId);
      setOrders(orders);
    }
    fetchOrders();
  }, [userId]);

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
        {orders.map((orden) => {
          return <div key={orden.orderDetails.id}>{orden.orderDetails.id}</div>;
        })}
      </div>
    </div>
  );
};

export default Profile;