import { Formik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { adminActions } from "../../AdminRedux";
import FileUpload from "./FileUploader";
import check from "../../../assets/svg/check.svg";
import ButtonSmall from "../../../components/Buttons/ButtonSmall/ButtonSmall";
import Toast from "../../../components/Toast";

type Props = {
  className: string;
};

const Create = ({ className }: Props): JSX.Element => {
  const [img, setImg] = useState(true);
  const [imgNumb, setImgNumb] = useState(0);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-white border-black rounded-none",
      cancelButton: "btn btn-danger",
    },
  });

  return (
    <div className={className}>
      <Formik
        initialValues={{
          name: "",
          description: "",
          color: "",
          S: 0,
          M: 0,
          L: 0,
          // XL: 0,
          price: 0,
          show_in_shop: "true",
          image: "",
          promotion: "false",
          promotional_price: 0,
        }}
        onSubmit={(values, { resetForm }) => {
          swalWithBootstrapButtons
            .fire({
              title:
                '<p class="mt-4 text-4xl font-bold font-rift text-black">¿Estás seguro?</p>',
              html: '<p class="font-poppins font-medium text-black italic" >Quieres crear el producto?</p>',
              showCancelButton: true,
              showConfirmButton: true,
              confirmButtonColor: "#376B7E",
              cancelButtonColor: "#e5e7eb",
              cancelButtonText: "<p class='text-lg text-black'>Cancelar</p>",
              confirmButtonText: "<p class='text-lg'>Si, crear!</p>",
              focusConfirm: false,
            })
            .then((result) => {
              if (result.isConfirmed) {
                img ? setImg(false) : setImg(true);
                adminActions.ADMcreate_product(
                  {
                    ...values,
                    show_in_shop: values.show_in_shop === "true" ? true : false,
                    promotion: values.promotion === "true" ? true : false,
                    promotional_price: values.promotional_price,
                  },
                  Toast
                );
                resetForm();
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
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 mx-12 my-4"
          >
            <div className="flex flex-col gap-2">
              <label className="text-xl">Nombre:</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder=""
                value={values.name}
                onChange={handleChange}
                className="font-mono w-96 "
                onBlur={handleBlur}
              />
              {errors.name && <p className="text-red-600 ">{errors.name}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl">Description:</label>
              <textarea
                id="description"
                name="description"
                placeholder=""
                value={values.description}
                onChange={handleChange}
                className="w-full h-40 pl-3 font-mono border border-gray-300 rounded-md text-align: first bg-gray-50"
                onBlur={handleBlur}
              />
              {errors.description && (
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
                  />
                </div>
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
                  />
                </div>
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
                  />
                </div>
                {/* <div className="flex gap-8">
                  <label className="w-2 text-xl">XL:</label>
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
              />
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
              />
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
              <p>Imagenes:</p>
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

            <Button
              text="Crear"
              name="createProd"
              onClick={handleSubmit}
              disabled={false}
              type="button"
              className={"justify-center"}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
