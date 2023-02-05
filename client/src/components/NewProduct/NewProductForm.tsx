import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import outIcon from "../../assets/svg/come-back.svg";
import { actionCreators } from "../../state";
import { State } from "../../state/reducers";
import Button from "../Buttons/Button/Button";
import Input from "../Inputs/Input";
import useNewProductForm from "./useNewProductForm";

const ProductForm: React.FC = () => {
  const [inputValues, dispatch] = useNewProductForm();
  const { adminLogin } = useSelector((state: State) => state.user);
  const navigate = useNavigate();

  const dispatcher = useDispatch();
  let { addProduct } = bindActionCreators(actionCreators, dispatcher);

  useEffect(() => {
    !adminLogin && navigate("/");
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addProduct(inputValues);
    dispatch({ type: "clear" });
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    dispatch({
      type: "change_value",
      payload: {
        inputName: name,
        inputValue: value,
      },
    });
  };

  const handleClear = () => {
    dispatch({ type: "clear" });
  };

  const allFieldsFilled = () =>
    Object.values(inputValues).every((value) => value !== "");

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mx-8 my-6">
        {/* TITULO */}
        <div className="flex items-center justify-between pr-3">
          <p className="text-2xl font-bold">Crear producto</p>
          <Link to="/">
            <img className="w-5 h-5" src={outIcon} />
          </Link>
        </div>

        {/* SE ENVIA NAME: NAME */}
        <div>
          <p className="text-xl font-medium ">NOMBRE:</p>
          <Input
            id="name"
            type="text"
            placeholder="Nombre..."
            name="name"
            value={inputValues.name}
            onChange={handleChange}
            className="italic font-poppins"
          />
        </div>

        {/* SE ENVIA NAME: DESCRIPTION */}
        <div>
          <p className="text-xl font-medium ">Descripcion:</p>
          <Input
            id="description"
            name="description"
            type="textarea"
            placeholder="Descripcion..."
            value={inputValues.description}
            onChange={handleChange}
            className="h-40 pt-0 italic font-poppins"
          />
        </div>

        {/* SE ENVIA NAME: COLOR */}
        <div>
          <p className="text-xl font-medium ">Color:</p>
          <select
            className="mt-2 "
            id="color"
            name="color"
            value={inputValues.color}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              ELEGIR COLOR
            </option>
            <option value="white">Blanco</option>
            <option value="black">Negro</option>
          </select>
        </div>

        {/* SE ENVIA NAME: TALLE */}
        <div>
          <p className="text-xl font-medium ">Talle:</p>
          <select
            className="mt-2 "
            id="size"
            name="size"
            value={inputValues.size}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              ELEGIR TALLE
            </option>
            <option value="x">X</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
        </div>

        {/* SE ENVIA NAME: FILE */}
        <div>
          <p className="text-xl font-medium ">Cargar imagenes</p>
          <input
            className="block w-full mt-2 text-sm cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
            id="image"
            name="image"
            type="file"
            value={undefined}
            multiple
          />
        </div>

        {/* SE ENVIA NAME: PRICE */}
        <div>
          <p className="text-xl font-medium ">Precio:</p>

          <Input
            id="price"
            name="price"
            type="number"
            value={inputValues.price}
            placeholder="$$$"
            onChange={handleChange}
            className="mt-2 italic font-poppins"
          />
        </div>

        {/* SE ENVIA NAME: STOCK */}
        <div>
          <p className="text-xl font-medium ">En Stock?</p>
          <select
            className="mt-2"
            id="show_in_shop"
            name="show_in_shop"
            value={inputValues.show_in_shop}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              ELEGIR OPCION
            </option>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>

        <Button
          text="Limpiar Formulario"
          name="clearProdCreation"
          onClick={handleClear}
          disabled={false}
        />

        <Button
          text="Crear Publicación"
          name="CreateProduct"
          onClick={handleSubmit}
          disabled={!inputValues}
        />
      </div>
    </form>
  );
};

export default ProductForm;
