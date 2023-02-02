import outIcon from "../../assets/svg/out-session.svg";
const NewProduct = () => {
  return (
    <div className="font-family: font-poppins flex-col max-w-sm items-center justify-start py-4 bg-white">
      <div className="inline-flex items-start justify-start w-full px-4 bg-white">
        <div className="inline-flex flex-col space-y-4 items-center justify-start flex-1">
          <div className="inline-flex items-start justify-between w-full">
            <p className="flex-1 h-full text-2xl font-bold leading-9 text-gray-900">
              Crear producto
            </p>
            <img className="w-8 h-8 rounded-lg" src={outIcon} />
          </div>

            <label 
                htmlFor="product_title"
                className="w-full text-md font-medium leading-tight text-gray-900"
            >
              Título
            </label>
            <div 
                className="inline-flex items-start justify-start w-full px-1 py-1 bg-gray-50 border rounded-lg border-gray-300">
              <div className="flex-1">
                <input
                  type="text"
                  id="product_title"
                  className="flex-1 text-md leading-none text-gray-900"
                  placeholder="Ingrese título"
                ></input>
              </div>
            </div>
          



          <div className="flex flex-col bg-gray-50 border rounded-lg border-gray-300">
            <label
              htmlFor="product_description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                name="prods"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Ingrese la descripción del producto"
                defaultValue={""}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Detalle las caracteristicas del producto de manera clara.
            </p>
          </div>



          <div className="flex flex-col space-y-2 items-center justify-start w-full">
            <p className="w-full text-sm font-medium leading-tight text-gray-900">
              Descripcion
            </p>
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <div className="flex-1">
                <p className="flex-1 text-sm leading-none text-gray-500">
                  Ingrese descripción...
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-center justify-start w-full">
            <p className="w-full text-sm font-medium leading-tight text-gray-900">
              Talles
            </p>
          </div>
          <div className="inline-flex space-x-4 items-center justify-start w-full">
            <div className="flex items-center justify-center w-7 h-6 pl-2 pr-1.5 border border-black">
              <p className="text-base font-medium leading-normal text-center">
                S
              </p>
            </div>
            <div className="flex items-center justify-center w-7 h-6 pl-1.5 pr-1 border border-black">
              <p className="text-base font-medium leading-normal text-center">
                M
              </p>
            </div>
            <div className="flex items-center justify-center w-7 h-6 px-2 border border-black">
              <p className="text-base font-medium leading-normal text-center">
                L
              </p>
            </div>
            <div className="flex items-center justify-center w-7 h-6 pl-1 pr-0.5 border border-black">
              <p className="text-base font-medium leading-normal text-center">
                XL
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-center justify-start w-full">
            <p className="w-full text-sm font-medium leading-tight text-gray-900">
              Imagen
            </p>
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <div className="flex items-center justify-center flex-1 h-full">
                <p className="flex-1 text-sm leading-none text-center text-gray-500">
                  Cloudinary
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 items-center justify-start w-full">
            <p className="w-full text-sm font-medium leading-tight text-gray-900">
              Precio Anterior
            </p>
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <div className="flex-1">
                <p className="flex-1 text-sm leading-none text-gray-500">
                  $$$ Para generar promoción
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-center justify-start w-full">
            <p className="w-full text-sm font-medium leading-tight text-gray-900">
              Precio Actual
            </p>
            <div className="inline-flex items-start justify-start w-full px-4 py-3 bg-gray-50 border rounded-lg border-gray-300">
              <div className="flex-1">
                <p className="flex-1 text-sm leading-none text-gray-500">$$$</p>
              </div>
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
