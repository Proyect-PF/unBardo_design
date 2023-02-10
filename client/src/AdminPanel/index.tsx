import Products from "./Products";
import { useState } from "react";

const AdminP = (): JSX.Element => {
  const [panel, setPanel] = useState("products");

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col w-2/12 gap-8 py-12 text-2xl font-bold border-r">
        <button onClick={() => setPanel("products")}>Products</button>
        <button onClick={() => setPanel("orders")}>Ordenes</button>
        <button onClick={() => setPanel("users")}>Usuarios</button>
      </div>
      <div className="w-full ">
        {panel === "products" && <Products />}
        {panel === "orders" && <div>Orders</div>}
        {panel == "users" && <div>Usuarios</div>}
      </div>
    </div>
  );
};

export default AdminP;
