export const a = "a";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { bindActionCreators } from "redux";
// import outIcon from "../../assets/svg/come-back.svg";
// import { actionCreators } from "../../state";
// import { State } from "../../state/reducers";
// import Button from "../Buttons/Button/Button";
// import Input from "../Inputs/Input";
// import UploadWidget from "../UploadWidget/UploadWidget";
// import useNewProductForm from "./useNewProductForm";

// const ProductForm: React.FC = () => {
//   const [inputValues, dispatch] = useNewProductForm();
//   const [disabled, setDisabled] = useState(false);

//   const { adminLogin } = useSelector((state: State) => state.user);
//   const navigate = useNavigate();

//   const dispatcher = useDispatch();
//   let { create_product } = bindActionCreators(actionCreators, dispatcher);

//   useEffect(() => {
//     !adminLogin && navigate("/");
//     setDisabled(allFieldsFilled());
//   }, [inputValues]);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(inputValues);
//     create_product(inputValues);
//     dispatch({ type: "clear" });
//     document.querySelectorAll("input[type=checkbox]").forEach((e: any) => {
//       e.checked = false;
//     });
//   };

//   const handleChange = (
//     event: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = event.target;
//     dispatch({
//       type: "change_value",
//       payload: {
//         inputName: name,
//         inputValue: value,
//       },
//     });
//   };

//   const handleClear = () => {
//     dispatch({ type: "clear" });
//   };

//   const handleSize = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     const { value } = event.target;
//     const index = inputValues.size.search(value);
//     if (index === -1) {
//       const newSizes = inputValues.size.split(",");
//       newSizes.push(value);
//       dispatch({
//         type: "change_value",
//         payload: {
//           inputName: "size",
//           inputValue: newSizes.join(","),
//         },
//       });
//     } else {
//       let newSizes = inputValues.size.split(",");
//       newSizes[newSizes.indexOf(value)] = "";
//       const newSizesS = newSizes.filter((e) => e !== "").join(",");
//       dispatch({
//         type: "change_value",
//         payload: {
//           inputName: "size",
//           inputValue: newSizesS,
//         },
//       });
//     }
//   };

//   const allFieldsFilled = (): boolean =>
//     Object.values(inputValues).every((value) => value !== "");

//   return (
//     <form id="formProd" onSubmit={handleSubmit}>
//       <div className="flex flex-col gap-4 mx-8 my-6">
//         {/* TITULO */}
//         <div className="flex items-center justify-between pr-3">
//           <p className="text-2xl font-bold">Crear producto</p>
//           <Link to="/">
//             <img className="w-5 h-5" src={outIcon} />
//           </Link>
//         </div>

//         {/* SE ENVIA NAME: NAME */}
//         <div>
//           <p className="text-xl font-medium ">NOMBRE:</p>
//           {/* <Input
//             id="name"
//             type="text"
//             placeholder="Nombre..."
//             name="name"
//             value={inputValues.name}
//             onChange={handleChange}
//             className="italic font-poppins"
//           /> */}
//         </div>

//         {/* SE ENVIA NAME: DESCRIPTION */}
//         <div>
//           <p className="text-xl font-medium ">Descripcion:</p>
//           {/* <Input
//             id="description"
//             name="description"
//             type="textarea"
//             placeholder="Descripcion..."
//             value={inputValues.description}
//             onChange={handleChange}
//             className="h-40 pt-0 italic font-poppins"
//           /> */}
//           <textarea
//             id="description"
//             name="description"
//             placeholder="Descripcion..."
//             value={inputValues.description}
//             onChange={handleChange}
//             className="w-full h-40 pt-0 pl-3 italic border border-gray-300 rounded-md font-poppins text-align: first bg-gray-50"
//           ></textarea>
//         </div>

//         {/* SE ENVIA NAME: COLOR */}
//         <div>
//           <p className="text-xl font-medium ">Color:</p>
//           <select
//             className="mt-2 "
//             id="color"
//             name="color"
//             value={inputValues.color}
//             onChange={handleChange}
//           >
//             <option value="" disabled hidden>
//               ELEGIR COLOR
//             </option>
//             <option value="white">Blanco</option>
//             <option value="black">Negro</option>
//           </select>
//         </div>

//         {/* SE ENVIA NAME: TALLE */}
//         <div>
//           <p className="text-xl font-medium ">Talle:</p>
//           <div className="flex gap-8">
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="S"
//                 name="sizeS"
//                 value="S"
//                 onChange={handleSize}
//               />
//               <p>S</p>
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="M"
//                 name="sizeM"
//                 value="M"
//                 onChange={handleSize}
//               />
//               <p>M</p>
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="L"
//                 name="sizeL"
//                 value="L"
//                 onChange={handleSize}
//               />
//               <p>L</p>
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="XL"
//                 name="sizeXL"
//                 value="XL"
//                 onChange={handleSize}
//               />
//               <p>XL</p>
//             </div>
//           </div>
//           {/* <select
//             className="mt-2 "
//             id="size"
//             name="size"
//             value={inputValues.size}
//             onChange={handleChange}
//           >
//             <option value="" disabled hidden>
//               ELEGIR TALLE
//             </option>
//             <option value="x">X</option>
//             <option value="xs">XS</option>
//             <option value="s">S</option>
//             <option value="m">M</option>
//             <option value="l">L</option>
//             <option value="xl">XL</option>
//             <option value="xxl">XXL</option>
//           </select> */}
//         </div>

//         {/* SE ENVIA NAME: FILE */}
//         <UploadWidget dispatch={dispatch} />
//         {/* <div>
//           <p className="text-xl font-medium ">Cargar imagenes</p>
//           <input
//             className="block w-full mt-2 text-sm cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
//             id="image"
//             name="image"
//             type="file"
//             value={undefined}
//             multiple
//           />
//         </div> */}

//         {/* SE ENVIA NAME: PRICE */}
//         <div>
//           <p className="text-xl font-medium ">Precio:</p>

//           {/* <Input
//             id="price"
//             name="price"
//             type="number"
//             value={inputValues.price}
//             placeholder="$$$"
//             onChange={handleChange}
//             className="mt-2 italic font-poppins"
//           /> */}
//         </div>

//         {/* SE ENVIA NAME: STOCK */}
//         <div>
//           <p className="text-xl font-medium ">En Stock?</p>
//           <select
//             className="mt-2"
//             id="show_in_shop"
//             name="show_in_shop"
//             value={inputValues.show_in_shop}
//             onChange={handleChange}
//           >
//             <option value="" disabled hidden>
//               ELEGIR OPCION
//             </option>
//             <option value="true">Si</option>
//             <option value="false">No</option>
//           </select>
//         </div>

//         <Button
//           type="button"
//           text="Limpiar Formulario"
//           name="clearProdCreation"
//           onClick={handleClear}
//           disabled={false}
//         />

//         <Button
//           type="submit"
//           text="Crear Publicación"
//           name="CreateProduct"
//           onClick={() => {}}
//           disabled={!disabled}
//         />
//       </div>
//     </form>
//   );
// };

// export default ProductForm;
