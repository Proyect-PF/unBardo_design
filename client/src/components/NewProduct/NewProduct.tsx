import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import outIcon from "../../assets/svg/out-session.svg";
import { actionCreators } from "../../state";
import Input from "../Inputs/Input";

interface FormData {
  title: string;
  description: string;
  price: string;
  sizes: string;
  color: string;
  inStock: string;
  image: File;
}

const ProductForm: React.FC = () => {
  const dispatch = useDispatch();
  const { addProduct } = bindActionCreators(actionCreators, dispatch);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    sizes: "",
    color: "",
    inStock: "",
    image: new File([], ""),
  });


  {/* ESTADO ERROR */}
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    sizes: "",
    color: "",
    price: "",
    image: "",
    inStock: "",
  });


  {/* VARIABLE PARA CHECKEAR QUE EL ESTADO NO ESTE VACIO */}
  const isFormValid =
    formData.title &&
    formData.description &&
    formData.sizes &&
    formData.color &&
    formData.price &&
    formData.image &&
    !Object.values(errors).some((error) => error !== "");

  
  // interface FormData {
  //   title: string;
  //   description: string;
  //   price: string;
  //   sizes: string;
  //   color: string;
  //   inStock: string;
  //   image: File;
  // }

  
              {/* MANEJADORES DE EVENTO */}

  {/* EVENTO PARA EL SUBMIT DEL FORM */}
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Hacer lamada a la api
    addProduct({
      name: formData.title,
      description: formData.description,
      size: formData.sizes,
      price: Number(formData.price),
      image: "",
      show_in_shop: "true",
    });
    console.log(formData);
  }; 

  {/* MANEJADOR CAMBIO DE VALUES INPUT */}
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  {/* MANEJADOR DE CAMBIO DE VALUES SELECT */}
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  {/* MANEJADOR DE CAMBIO DE FILE INPUT IMAGE */}
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, image: event.target.files![0] });
  };

  return (
    <form
      onSubmit={handleSubmit} 
      className="flex-col items-center justify-start max-w-sm py-4 font-mono bg-white"
    >
      <div>
        <div className="inline-flex items-start justify-start w-full px-4 bg-white">
          
          
          {/* TITULO */}
          <div className="">
            <div className="inline-flex items-start justify-between w-full">
              <p className="flex-1 h-full text-2xl font-bold leading-9 text-gray-900">
                Crear producto
              </p>
              <a href="http://localhost:3000/">
                <img className="w-8 h-8 rounded-lg" src={outIcon} />
              </a>
            </div>


            {/* SE ENVIA NAME: TITLE */}
            <div className="text-left text-align: left ">
              Titulo
              {errors.title && <p>{errors.title}</p>}
              <div className="inline-flex items-start justify-start w-full px-1 py-3 rounded-lg">
                <div className="flex-1">
                  <Input
                    id="title"
                    type="text"
                    placeholder="Ingrese Titulo"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* SE ENVIA NAME: DESCRIPTION */}
            <div className="text-left text-align: left ">
              Descripcion
              <div className="inline-flex items-start justify-start w-full px-1 ">
                <Input
                  id="description"
                  name="description"
                  type="textarea"
                  placeholder="Ingrese descripcion"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
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
                  value={formData.color}
                  onChange={handleSelect}
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
                    id="sizes"
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleSelect}
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
                  onChange={handleFileChange}
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
                  type="string"
                  value={formData.price}
                  placeholder="$$$"
                  onChange={handleChange}
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
                  id="inStock"
                  name="inStock"
                  value={formData.inStock}
                  onChange={handleSelect}
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
                  disabled={!isFormValid}
                  style={{ opacity: isFormValid ? 1 : 0.5 }}
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
