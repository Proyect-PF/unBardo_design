import Products from "./Products";
import { useState } from "react";

const AdminP = (): JSX.Element => {
  const [panel, setPanel] = useState("products");

  return (
    <div>
      <Products />
    </div>
  );
};

export default AdminP;
