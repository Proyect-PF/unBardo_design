import Products from "./Products";
import { useState } from "react";

const AdminP = (): JSX.Element => {
  const [panel, setPanel] = useState("products");

  return (
    <div className="flex flex-row justify-between">
      <div className="w-1/12 ">
        <button onClick={() => setPanel("products")}>Products</button>
      </div>
      <div className="w-11/12">
        <div className={panel === "products" ? "visible" : "hidden"}>
          <Products />
        </div>
      </div>
    </div>
  );
};

export default AdminP;
