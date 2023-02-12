//import { useState } from "react";
import { useSelector } from "react-redux";
//import Input from "../../../components/Inputs/Input";
import { State } from "../../../state/reducers";

type Props = {
  className: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
};

const ListOrders = ({ className, setSelected, setId }: Props): JSX.Element => {
  const { allOrders } = useSelector((state: State) => state.admin);

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-around w-full text-center border-t">
        <p className="w-8 border-r border-black">Id</p>
        <p className="w-60 ">Nombre</p>
        <p className="w-60 ">Email</p>
        <p className="w-40 ">Fecha</p>
        <p className="w-24 ">Status</p>
        <p className="w-20"></p>
      </div>
      {allOrders &&
        allOrders.map((e: any) => (
          <div className="flex items-center justify-around w-full text-center border-t">
            <p className="w-8 border-r border-black">{e.id}</p>
            <p className=" w-60">{e.users.fullname}</p>
            <p className=" w-60">{e.users.email}</p>
            <p className="w-40 ">{e.updatedAt.split("T")[0]}</p>
            <p className="w-24 ">{e.status}</p>
            <button
              onClick={() => {
                setId(e.id);
                setSelected("details");
              }}
              className="w-20 py-2 border border-black"
            >
              Detalles
            </button>
          </div>
        ))}
    </div>
  );
};

export default ListOrders;
