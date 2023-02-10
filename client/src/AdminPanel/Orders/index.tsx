import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { adminActionCreators } from "../HttpRequests";
import OrderDetails from "./Details";
import ListOrders from "./List";

const Orders = (): JSX.Element => {
  const [selected, setSelected] = useState("list");
  const dispatch = useDispatch();
  const [id, setId] = useState(1);
  const { fetch_order_id } = bindActionCreators(adminActionCreators, dispatch);

  useEffect(() => {
    fetch_order_id(id);
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
