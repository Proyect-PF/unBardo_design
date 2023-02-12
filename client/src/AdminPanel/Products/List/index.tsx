import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { State } from "../../../state/reducers";
import { adminActions } from "../../AdminRedux";

type Props = {
  className: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<number | undefined>>;
};
const ListProducts = ({
  className,
  setSelected,
  setId,
}: Props): JSX.Element => {
  const { allProducts } = useSelector((state: State) => state.admin);
  const dispatch = useDispatch();
  const { ADMfetch_products_name, ADMfetch_products } = bindActionCreators(
    adminActions,
    dispatch
  );
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ADMfetch_products_name(search);
  };

  return (
    <div className={`${className} relative`}>
      <form onSubmit={handleSubmit}>
        <Input
          id="searchProdAdmin"
          type="text"
          onChange={handleChange}
          placeholder="Buscar un producto..."
          name="searchProdAdmin"
          value={search}
          onBlur={() => {}}
          className="absolute w-80 -top-16 left-12"
        />
      </form>
      <Button
        text="Limpiar"
        name="clearProdSearchADM"
        onClick={() => {
          ADMfetch_products();
        }}
        disabled={false}
        type="button"
        className="absolute w-32 -top-20 left-96"
      />
      <div className="flex items-center justify-around w-full text-center border-t">
        <p className="w-8 border-r border-black">Id</p>
        <p className="w-40 ">Nombre</p>
        <p className="w-16 ">Color</p>
        <p className="w-16 ">Precio</p>
        <p className=" w-28">Mostrar en Web</p>
        <p className="w-8 ">S</p>
        <p className="w-8 ">M</p>
        <p className="w-8 ">L</p>
        <p className="w-8 ">XL</p>
        <p className="w-20 ">Preview</p>
        <p className="w-14"></p>
      </div>
      {allProducts &&
        allProducts.map((e: any) => (
          <div className="flex items-center justify-around w-full text-center border-t">
            <p className="w-8 border-r border-black">{e.id}</p>
            <p className="w-40">{e.name}</p>
            <p className="w-16">{e.color}</p>
            <p className="w-16">{e.price}</p>
            <p className="w-24">{e.show_in_shop ? "Si" : "No"}</p>
            <p className="w-8">{e.S}</p>
            <p className="w-8">{e.M}</p>
            <p className="w-8">{e.L}</p>
            <p className="w-8">{e.XL}</p>
            <img src={e.image} className="w-20" alt=""/>
            <button
              onClick={() => {
                setId(e.id);
                setSelected("edit");
              }}
              className="py-2 border border-black w-14"
            >
              Edit
            </button>
          </div>
        ))}
    </div>
  );
};

export default ListProducts;
