import { useSelector } from "react-redux";
import { State } from "../../../state/reducers";
import { AdminState } from "../../AdminRedux/reducer";

type Props = {
  className: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
};

const ListOrders = ({ className, setSelected, setId }: Props): JSX.Element => {
  const { allOrders } = useSelector((state: AdminState) => state);

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
        allOrders.map((e) => (
          <div className="flex items-center justify-around w-full text-center border-t">
            <p className="w-8 border-r border-black">{e.id}</p>
            <p className=" w-60">{e.fullname}</p>
            <p className=" w-60">{e.email}</p>
            <p className="w-40 ">{e.createdAt}</p>
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
