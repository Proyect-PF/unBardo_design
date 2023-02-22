import Products from "./Products";
import { useState, useEffect } from "react";
import InformationPanel from "./Information";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Orders from "./Orders";
import { adminActions } from "./AdminRedux";
import { State } from "../state/reducers";
import { useNavigate } from "react-router-dom";
import EmailList from "./Email";
import Pricing from "./Pricing";
import arrow from "../assets/svg/googleIcons/arrow.svg";

const AdminP = (): JSX.Element => {
  const [panel, setPanel] = useState("info");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ADMfetch_products } = bindActionCreators(adminActions, dispatch);
  const { userType } = useSelector((state: State) => state.user);

  useEffect(() => {
    if (userType !== "admin") navigate("/");
    ADMfetch_products();
  }, []);

  return (
    <div className="flex flex-row justify-between">
      <div
        className={`flex flex-col gap-8 px-4 py-12 text-2xl font-bold bg-white border-r shadow-xl min-h-screen`}
      >
        <button onClick={() => setPanel("info")}>Dashboard</button>
        <button onClick={() => setPanel("products")}>Productos</button>
        <button onClick={() => setPanel("orders")}>Ordenes</button>
        <button onClick={() => setPanel("pricing")}>Tarifas</button>
      </div>

      <div className="w-full ">
        {panel === "products" && <Products />}
        {panel === "orders" && <Orders />}
        {panel === "info" && <InformationPanel />}
        {panel === "pricing" && <Pricing />}
      </div>
    </div>
  );
};

export default AdminP;
