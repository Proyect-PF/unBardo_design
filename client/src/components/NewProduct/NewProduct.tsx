import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import outIcon from "../../assets/svg/come-back.svg";
import { actionCreators } from "../../state";
import Input from "../Inputs/Input";


import { Product } from "../../state/types";

interface FormState {
  inputValues:  Product
}


const ProductForm: React.FC = () => {

  // En el parent de app podriamos preparar los dispatcher y directamente pasar por props la funcion addProduct por ej
  // para evitar sobreimportanciones en cada componente
  let dispatch = useDispatch();
  let { addProduct } = bindActionCreators(actionCreators, dispatch);
  let navigate = useNavigate();

  const [inputValues, setinputValues] = useState<FormState["inputValues"]>({
    name: "",
    description: "",
    price: 0,
    size: "",
    color: "",
    show_in_shop: "",
    image: new File([], ""),
  });

  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addProduct(inputValues)
    navigate('/');
    console.log(inputValues);
  };


  const allFieldsFilled = () =>
  Object.values(inputValues).every((value) => value !== "");
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)  => {
    setinputValues({ ...inputValues, [event.target.name]: event.target.value });
  };
 


  return (
    <form
      onSubmit={handleSubmit}
      className="flex-col items-center justify-start max-w-sm py-4 bg-white"
    >
      <div>
        <div className="inline-flex items-start justify-start w-full px-4 bg-white">
          {/* TITULO */}
          <div className="">
            <div className="inline-flex items-center justify-between w-full">
              <p className="flex-1 h-full text-2xl font-bold leading-9 text-gray-900">
                Crear producto
              </p>
              <Link to="/">
                <img className="w-5 h-5" src={outIcon} />
              </Link>
            </div>

            {/* SE ENVIA NAME: NAME */}
            <div className="text-left text-align: left ">
              Titulo
              <div className="inline-flex items-start justify-start w-full px-1 py-3 rounded-lg">
                <div className="flex-1">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ingrese Titulo"
                    name="name"
                    value={inputValues.name}
                    onChange={handleChange}
                    className=""
                  />
                </div>
              </div>
            </div>

            {/* SE ENVIA NAME: DESCRIPTION */}
            <div className="flex-inline">
              Descripcion
              <Input
                id="description"
                name="description"
                type="textarea"
                placeholder="Ingrese descripcion"
                value={inputValues.description}
                onChange={handleChange}
                className="h-40"
              />

              
            </div>

            {/* SE ENVIA NAME: COLOR */}
            <div>
              <div className="text-left text-align: left ">
                <div className="inline-flex items-start justify-start w-full "></div>
                Color:
                <select
                  className="inline-flex items-start"
                  id="color"
                  name="color"
                  value={inputValues.color}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    {" "}
                    ELEGIR COLOR{" "}
                  </option>
                  <option value="white">Blanco</option>
                  <option value="black">Negro</option>
                </select>
              </div>
            </div>

            {/* SE ENVIA NAME: TALLE */}
            <div className="text-left text-align: left ">
              <div className="inline-flex items-start justify-start w-full py-4 ">
                <div>
                  <label htmlFor="size">Talle:</label>
                  <select
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
              </div>
            </div>

            {/* SE ENVIA NAME: FILE */}
            <div className="text-left text-align: left ">
              Cargar imagenes
              <div className="inline-flex items-start justify-start w-full px-1 py-3 ">
                <input
                  className="block w-full text-sm border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
                  id="image"
                  name="image"
                  type="file"
                  value={undefined}
                  multiple
                ></input>
              </div>
            </div>

            {/* SE ENVIA NAME: PRICE */}
            <div className="text-left text-align: left ">
              Precio Actual
              <div className="inline-flex items-start justify-start w-full px-1 py-3">
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={inputValues.price}
                  placeholder="$$$"
                  onChange={handleChange}
                  className=""
                />
              </div>
            </div>

            {/* SE ENVIA NAME: STOCK */}
            <div>
              <div className="text-left text-align: left ">
                <div className="inline-flex items-start justify-start w-full "></div>
                En stock?:
                <select
                  className="inline-flex items-start"
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
            </div>

            <div className="inline-flex items-center justify-center px-5 py-3 border border-gray-900 w-80">
              <p className="text-base font-medium leading-normal text-gray-900">
                <button
                  type="submit"
                  disabled={!inputValues}
                  style={{ opacity: allFieldsFilled() ? 1 : 0.5 }}
                >
                  {" "}
                  Crear Publicación
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
