import Products from "./Products";
import { useState, useEffect } from "react";
import InformationPanel from "./Information";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Orders from "./Orders";
import { adminActions } from "./AdminRedux";

const AdminP = (): JSX.Element => {
  const [panel, setPanel] = useState("info");
  const dispatch = useDispatch();
  const { ADMfetch_products } = bindActionCreators(adminActions, dispatch);

  useEffect(() => {
    ADMfetch_products();
  }, []);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col w-2/12 gap-8 py-12 text-2xl font-bold border-r">
        <button onClick={() => setPanel("info")}>Resumen</button>
        <button onClick={() => setPanel("products")}>Productos</button>
        <button onClick={() => setPanel("orders")}>Ordenes</button>
      </div>
      <div className="w-full ">
        {panel === "products" && <Products />}
        {panel === "orders" && <Orders />}
        {panel == "info" && <InformationPanel />}
      </div>
    </div>
  );
};

export default AdminP;
