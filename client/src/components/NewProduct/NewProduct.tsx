import React, { useState } from "react";
import outIcon from "../../assets/svg/out-session.svg";
import Input from "../Inputs/Input";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

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

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    sizes: "",
    color: "",
    price: "",
    image: "",
    inStock: "",
  });

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.sizes &&
    formData.color &&
    formData.price &&
    formData.image &&
    !Object.values(errors).some((error) => error !== "");

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
  // interface FormData {
  //   title: string;
  //   description: string;
  //   price: string;
  //   sizes: string;
  //   color: string;
  //   inStock: string;
  //   image: File;
  // }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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
          <div className="">
            <div className="inline-flex items-start justify-between w-full">
              <p className="flex-1 h-full text-2xl font-bold leading-9 text-gray-900">
                Crear producto
              </p>
              <a href="http://localhost:3000/">
                <img className="w-8 h-8 rounded-lg" src={outIcon} />
              </a>
            </div>

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

            {/*<div className="text-left text-align: left ">
              En stock
              <div className="inline-flex items-start justify-start w-full px-1 py-3">
                <div>
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                  />
                  <label htmlFor="in-stock">En stock</label>
                </div>
              </div>
            </div>*/}

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
