import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { State } from "../../../state/reducers";
import { adminActions } from "../../AdminRedux";
import FileUpload from "../Create/FileUploader";
import Swal from "sweetalert2";
import trash from "../../../assets/svg/trash.svg";
import edit from "../../../assets/svg/pencil-alt.svg";
import ButtonSmall from "../../../components/Buttons/ButtonSmall/ButtonSmall";
import Toast from "../../../components/Toast";
import { validationCreateSchema } from "../../../utils/validationCreateProduct";

type Props = {
  className: string;
};

const Edit = ({ className }: Props): JSX.Element => {
  const { productDetails } = useSelector((state: State) => state.admin);
  const [img, setImg] = useState(true);
  const [imgNumb, setImgNumb] = useState(0);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-white border-black rounded-none",
      cancelButton: "btn btn-danger",
    },
  });

  const handleDelete = () => {
    swalWithBootstrapButtons
      .fire({
        title:
          '<p class="mt-4 text-4xl font-bold  text-black">¿Estás seguro?</p>',
        html: '<p class="font-poppins font-medium text-black italic" >Eliminaras este producto definitivamente</p>',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#ED5E68",
        cancelButtonColor: "#e5e7eb",
        confirmButtonText: '<p class=" text-lg text-black">Si, Remover!</p>',
        cancelButtonText: '<p class=" text-lg text-black">No, cancelar!</p>',
        focusConfirm: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          adminActions.ADMdelete_product(productDetails.id, Toast);
        }
      });
  };

  return (
    <div className={className}>
      <Formik
        enableReinitialize={true}
        validationSchema={validationCreateSchema}
        initialValues={{
          name: productDetails.name,
          description: productDetails.description,
          color: productDetails.color,
          S: productDetails.S,
          M: productDetails.M,
          L: productDetails.L,
          // XL: productDetails.XL,
          price: productDetails.price,
          show_in_shop: productDetails.show_in_shop ? "true" : "false",
          image: productDetails.image,
          image2: productDetails.image2,
          image3: productDetails.image3,
          image4: productDetails.image4,
          promotion: productDetails.promotion ? "true" : "false",
          promotional_price: productDetails.promotional_price,
        }}
        onSubmit={(values) => {
          swalWithBootstrapButtons
            .fire({
              title:
                '<p class="mt-4 text-4xl font-bold text-black">¿Estás seguro?</p>',
              html: '<p class="font-poppins font-medium text-black italic" >Editaras este producto definitivamente</p>',
              showCancelButton: true,
              showConfirmButton: true,
              confirmButtonColor: "#376B7E",
              cancelButtonColor: "#e5e7eb",
              confirmButtonText: '<p class="text-lg ">Si, editar!</p>',
              cancelButtonText:
                '<p class="text-lg text-black">No, cancelar!</p>',
              focusConfirm: false,
            })
            .then((result) => {
              if (result.isConfirmed) {
                img ? setImg(false) : setImg(true);
                adminActions.ADMupdate_product(
                  {
                    ...values,
                    id: productDetails.id,
                    show_in_shop: values.show_in_shop === "true" ? true : false,
                    promotion: values.promotion === "true" ? true : false,
                  },
                  Toast
                );
              }
            });
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 p-8 m-10 border shadow-xl shadow-slate-400 rounded-2xl"
          >
            <p className="text-2xl ">{`Producto: ${productDetails.id}`}</p>
            <div className="flex flex-col gap-2">
              <label className="text-xl">Nombre:</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder=""
                value={values.name}
                onChange={handleChange}
                className="font-mono "
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <p className="text-red-600 ">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl">Description:</label>
              <textarea
                id="description"
                name="description"
                placeholder=""
                value={values.description}
                onChange={handleChange}
                className="w-full h-40 pt-2 pl-3 font-mono border border-gray-300 rounded-md bg-gray-50"
                onBlur={handleBlur}
              />
              {errors.description && touched.description && (
                <p className="text-red-600 ">{errors.description}</p>
              )}
            </div>
            <div className="flex gap-8">
              <p className="text-xl">Color:</p>
              <select
                id="color"
                name="color"
                value={values.color}
                onChange={handleChange}
                className="text-xl border-b border-black"
              >
                <option value="" disabled></option>
                <option value="white">Blanco</option>
                <option value="black">Negro</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl">Stock:</p>
              <div className="flex gap-8">
                <div className="flex gap-8">
                  <label className="w-2 text-xl">1:</label>
                  <Input
                    type="number"
                    id="S"
                    name="S"
                    placeholder=""
                    value={values.S}
                    onChange={handleChange}
                    className="font-mono w-14"
                    onBlur={handleBlur}
                    min={0}
                  />
                </div>
                {errors.S && touched.S && (
                  <p className="text-red-600 ">{errors.S}</p>
                )}
                <div className="flex gap-8">
                  <label className="w-2 text-xl">2:</label>
                  <Input
                    type="number"
                    id="M"
                    name="M"
                    placeholder=""
                    value={values.M}
                    onChange={handleChange}
                    className="font-mono w-14"
                    onBlur={handleBlur}
                    min={0}
                  />
                </div>
                {errors.M && touched.M && (
                  <p className="text-red-600 ">{errors.M}</p>
                )}
                <div className="flex gap-8">
                  <label className="w-2 text-xl">3:</label>
                  <Input
                    type="number"
                    id="L"
                    name="L"
                    placeholder=""
                    value={values.L}
                    onChange={handleChange}
                    className="font-mono w-14"
                    onBlur={handleBlur}
                    min={0}
                  />
                </div>
                {errors.L && touched.L && (
                  <p className="text-red-600 ">{errors.L}</p>
                )}
                {/* <div className="flex gap-8">
                  <label className="w-2 text-xl ">XL:</label>
                  <Input
                    type="number"
                    id="XL"
                    name="XL"
                    placeholder=""
                    value={values.XL}
                    onChange={handleChange}
                    className="font-mono w-14"
                    onBlur={handleBlur}
                  />
                </div> */}
              </div>
            </div>
            <div className="flex gap-16">
              <label className="w-4 text-xl">Precio:</label>
              <Input
                type="number"
                id="price"
                name="price"
                placeholder=""
                value={values.price}
                onChange={handleChange}
                className="w-24 font-mono"
                onBlur={handleBlur}
                min={0}
              />
              {errors.price && touched.price && (
                <p className="text-red-600 ">{errors.price}</p>
              )}
            </div>
            <div className="flex gap-8">
              <p className="text-xl">Producto en promocion?:</p>
              <select
                id="promotion"
                name="promotion"
                value={values.promotion}
                onChange={handleChange}
                className="text-xl border-b border-black"
              >
                <option value="" disabled></option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
              <label
                className={`text-xl w-fit ${
                  values.promotion === "true" ? "visible" : "hidden"
                }`}
              >
                Precio promocional:
              </label>
              <Input
                type="number"
                id="promotional_price"
                name="promotional_price"
                placeholder=""
                value={values.promotional_price}
                onChange={handleChange}
                className={`w-24 font-mono ${
                  values.promotion === "true" ? "visible" : "hidden"
                }`}
                onBlur={handleBlur}
                min={0}
              />
              {errors.promotional_price && touched.promotional_price && (
                <p className="text-red-600 ">{errors.promotional_price}</p>
              )}
            </div>
            <div className="flex gap-8">
              <p className="text-xl">Mostrar en tienda:</p>
              <select
                id="show_in_shop"
                name="show_in_shop"
                value={values.show_in_shop}
                onChange={handleChange}
                className="text-xl border-b border-black"
              >
                <option value="" disabled></option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="flex flex-col gap-4">
              <p>Imagenes actuales:</p>
              <div className="flex flex-row w-40 gap-8">
                {values.image && <img src={values.image} />}
                {values.image2 && <img src={values.image2} />}
                {values.image3 && <img src={values.image3} />}
                {values.image4 && <img src={values.image4} />}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p>Cargar imagenes:</p>
              <div>
                <p>Principal:</p>
                <FileUpload
                  setFieldValue={setFieldValue}
                  fieldName="image"
                  force={img}
                />
              </div>
              <div>
                <p>Secundaria:</p>
                <FileUpload
                  setFieldValue={setFieldValue}
                  fieldName="image2"
                  force={img}
                />
              </div>
              {imgNumb > 0 && (
                <div>
                  <p>Imagen 3:</p>
                  <FileUpload
                    setFieldValue={setFieldValue}
                    fieldName="image3"
                    force={img}
                  />
                </div>
              )}
              {imgNumb > 1 && (
                <div>
                  <p>Imagen 4:</p>
                  <FileUpload
                    setFieldValue={setFieldValue}
                    fieldName="image4"
                    force={img}
                  />
                </div>
              )}
              <div className="flex flex-row gap-4">
                <ButtonSmall
                  text="añadir imagen"
                  name="addImg"
                  onClick={() => {
                    if (imgNumb < 2) setImgNumb(imgNumb + 1);
                  }}
                  disabled={false}
                  type="button"
                />
                {imgNumb > 0 && (
                  <ButtonSmall
                    text="quitar imagen"
                    name="rmvImg"
                    onClick={() => {
                      if (imgNumb > 0) setImgNumb(imgNumb - 1);
                    }}
                    disabled={false}
                    type="button"
                  />
                )}
              </div>
            </div>

            <div>
              <Button
                text="Guardar"
                name="updateProd"
                onClick={handleSubmit}
                disabled={false}
                type="button"
                className={"justify-center"}
              />
              <Button
                text="Eliminar Producto"
                name="deleteProd"
                onClick={handleDelete}
                disabled={false}
                type="button"
                className={"justify-center"}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Edit;
