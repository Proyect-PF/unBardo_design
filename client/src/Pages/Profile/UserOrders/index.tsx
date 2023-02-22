import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../../components/Buttons/Button/Button";
import { baseURL, PORT } from "../../../utils/url&port";

interface Order {
  id: number;
  id_user: number;
  status: string;
  payment_id: number;
  dispatched: string;
  createdAt: string;
  updatedAt: string;
  product: any[];
}

interface Props {
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
  userId: string;
  fullname: string;
  email: string;
}

const UserOrders = ({
  setPanel,
  setDetailId,
  userId,
  fullname,
  email,
}: Props) => {
  const [userOrders, setUserOrders] = useState<Array<Order>>([]);
  useEffect(() => {
    axios.get(`${baseURL}/orders/users/${userId}`).then((response) => {
      setUserOrders(response.data);
    });
  }, [userId]);

  return (
    <div className="text-lg font-semibold">
      <Button
        type="button"
        text="Volver al perfil"
        name="back"
        onClick={() => {
          setPanel("info");
        }}
        disabled={false}
        className="justify-end pr-12"
      />
      <div className="flex items-center text-xxs justify-around w-full mt-4 text-center border-t">
        <p className="w-40 ">Fecha</p>
        <p className="w-24 ">Status</p>
        <p className="w-24 ">Despachada</p>
      </div>
      {userOrders.map((e) => (
        <div
        key={e.id}
          className="flex items-center justify-around bg-gray-100 duration-300 w-full py-2 text-center border-t cursor-pointer hover:bg-gray-200"
          onClick={() => {
            setDetailId(e.id);
            setPanel("orderdetail");
          }}
        >
          <p className="w-40 ">{e.updatedAt.split("T")[0]}</p>
          <p className="w-24 ">{e.status}</p>
          <p className="w-24 ">{e.dispatched ? "Si" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
