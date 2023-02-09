import Button from "../../components/Buttons/Button/Button";
import ListProducts from "./List";
import { useState } from "react";
import Create from "./Create";

const Products = (): JSX.Element => {
  const [selected, setSelected] = useState("list");

  return (
    <div className="mx-12">
      <Button
        type="button"
        text={selected === "list" ? "Crear producto" : "Atras"}
        name="prodButton"
        disabled={false}
        onClick={
          selected === "list"
            ? () => setSelected("create")
            : () => setSelected("list")
        }
      />
      <ListProducts className={selected === "list" ? "visible" : "hidden"} />
      <Create className={selected === "create" ? "visible" : "hidden"} />
    </div>
  );
};

export default Products;
