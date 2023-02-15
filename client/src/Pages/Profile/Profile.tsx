import { State } from "../../state/reducers";
import axios from "axios";
import { PORT, baseURL } from "../../utils/url&port";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

type Orden = {
  id: number;
  id_user: number;
  status: string;
  payment_id: number;
  dispatched: boolean;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    id_order: number;
    id_product: number;
    sizes: {
      [key: number]: number;
    };
    createdAt: string;
    updatedAt: string;
  }[];
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
        <ul>
        {orders.map((order: Orden) => (
      <li key={order.id}>
        <h3>Order ID: {order.id}</h3>
        <p>Status: {order.status}</p>
        <p>Payment ID: {order.payment_id}</p>
        <p>Dispatched: {order.dispatched ? "Yes" : "No"}</p>
        <p>Product:</p>
        <ul>
          {order.product.map((item) => (
            <li key={item.id}>
              <p>Product ID: {item.id_product}</p>
              <p>Sizes:</p>
              <ul>
                {Object.entries(item.sizes).map(([size, quantity]) => (
                  <li key={size}>
                    {size}: {quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li>
    ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
