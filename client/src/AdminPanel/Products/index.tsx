import Button from "../../components/Buttons/Button/Button";
import ListProducts from "./List";
import { useState, useEffect } from "react";
import Create from "./Create";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import Edit from "./Edit/Index";

const Products = (): JSX.Element => {
  const [selected, setSelected] = useState("list");
  const dispatch = useDispatch();
  const [id, setId] = useState(1);
  const { fetch_products, fetch_product_detail } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    fetch_products();
  }, []);

  useEffect(() => {
    fetch_product_detail(id);
  }, [id]);

  return (
    <div className="">
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
        className="justify-end pr-12"
      />

      {selected === "list" && (
        <ListProducts
          className={" font-semibold text-lg"}
          setSelected={setSelected}
          setId={setId}
        />
      )}
      {selected === "create" && <Create className={""} />}
      {selected === "edit" && <Edit className={""} />}
    </div>
  );
};

export default Products;
