import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { adminActions } from "../AdminRedux";
import OrderDetails from "./Details";
import ListOrders from "./List";

type Props = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};
const Orders = ({ selected, setSelected }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const { ADMfetch_order_id } = bindActionCreators(adminActions, dispatch);

  useEffect(() => {
    if (id !== 0) ADMfetch_order_id(id);
  }, [id]);

  return (
    <div className="">
      {selected === "list" && (
        <ListOrders
          className={" font-semibold text-lg"}
          setSelected={setSelected}
          setId={setId}
        />
      )}
      {selected === "details" && <OrderDetails setSelected={setSelected} />}
    </div>
  );
};

export default Orders;
