import Button from "../../components/Buttons/Button/Button";
import ListProducts from "./List";
import { useState, useEffect } from "react";
import Create from "./Create";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import Edit from "./Edit/Index";
import { adminActions } from "../AdminRedux";

const Products = (): JSX.Element => {
  const [selected, setSelected] = useState("list");
  const dispatch = useDispatch();
  const [id, setId] = useState<number | undefined>(1);
  const { ADMfetch_products, ADMfetch_products_id } = bindActionCreators(
    adminActions,
    dispatch
  );

  useEffect(() => {
    ADMfetch_products();
  }, []);

  useEffect(() => {
    ADMfetch_products_id(id);
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
                ADMfetch_products();
              }
        }
        className="justify-end pr-12"
      />

      {selected === "list" && (
        <ListProducts
          className={"font-semibold text-lg"}
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
