import outIcon from "../../assets/svg/out-session.svg";
import SizeSelector from "../Inputs/SizeSelector/SizeSelector";

import Input from "../Inputs/Input";
const NewProduct = () => {
  return (
    <div className="font-family: font-poppins flex-col max-w-sm items-center justify-start py-4 bg-white">
      <div className="inline-flex items-start justify-start w-full px-4 bg-white">
        <div className="">

        
          <div className="inline-flex items-start justify-between w-full">
            <p className="flex-1 h-full text-2xl font-bold leading-9 text-gray-900">
              Crear producto
            </p>
            <img className="w-8 h-8 rounded-lg" src={outIcon} />
          </div>

          <div className="text-left text-align: left ">
            Titulo
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Ingrese Titulo"
                  name="titulo"
                  value=""
                  onChange=""
                />
              </div>
            </div>
          </div>

          <div className="text-left text-align: left ">
            Descripcion
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <Input
                type="textarea"
                placeholder="Ingrese descripcion"
                name="texto"
                value=""
                onChange=""
              />
            </div>
          </div>

          <div className="text-left text-align: left ">
            Seleccionar talle
            <div className="flex flex-col border rounded-lg border-gray-300">
              <SizeSelector sizes={["x", "s", "m"]} />
            </div>
          </div>

          <div className="text-left text-align: left ">
            Cargar imagenes
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files"
                type="file"
                multiple
              ></input>
            </div>
          </div>

          <div className="text-left text-align: left ">
            Precio anterior
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <Input
                type="text"
                placeholder="$$$"
                name="titulo"
                value=""
                onChange=""
              />
            </div>
          </div>

          <div className="text-left text-align: left ">
            Precio Actual
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <Input
                type="text"
                placeholder="$$$"
                name="titulo"
                value=""
                onChange=""
              />
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center h-5">
              <input
                id="helper-checkbox"
                aria-describedby="helper-checkbox-text"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              ></input>
            </div>
            <div className="ml-2 text-sm">
              <label
                htmlFor="helper-checkbox"
                className="font-medium text-gray-900 dark:text-gray-1000"
              >
                Seleccionar si hay stock
              </label>
              <p
                id="helper-checkbox-text"
                className="text-xs font-normal text-gray-500 dark:text-gray-600"
              >
                Aquellos productos marcados estarán disponibles.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center justify-center w-80 px-5 py-3 border border-gray-900">
            <p className="text-base font-medium leading-normal text-gray-900">
              Crear Publicación
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
