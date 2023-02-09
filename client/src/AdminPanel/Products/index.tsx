import Button from "../../components/Buttons/Button/Button";
import ListProducts from "./List";
import { useState, useEffect } from "react";
import Create from "./Create";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";

const Products = (): JSX.Element => {
  const [selected, setSelected] = useState("list");
  const dispatch = useDispatch();
  const { fetch_products } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    fetch_products();
  }, []);

  return (
    <div>
      <Button
        type="button"
        text={selected === "list" ? "Crear producto" : "Atras"}
        name="prodButton"
        disabled={false}
        onClick={
          selected === "list"
            ? () => setSelected("create")
            : () => {
                setSelected("list");
                fetch_products();
              }
        }
      />
      <ListProducts className={selected === "list" ? "visible" : "hidden"} />
      <Create className={selected === "create" ? "visible" : "hidden"} />
    </div>
  );
};

export default Products;
