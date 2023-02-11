import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { State } from "../../../state/reducers";
import { adminActions } from "../../AdminRedux";
import FileUpload from "../Create/FileUploader";
import Swal from "sweetalert2";

type Props = {
  className: string;
};

const Edit = ({ className }: Props): JSX.Element => {
  const { productDetails } = useSelector((state: State) => state.admin);
  const [img, setImg] = useState(true);

  return (
    <div className={className}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: productDetails.name,
          description: productDetails.description,
          color: productDetails.color,
          S: productDetails.S,
          M: productDetails.M,
          L: productDetails.L,
          XL: productDetails.XL,
          price: productDetails.price,
          show_in_shop: productDetails.show_in_shop ? "true" : "false",
          image: productDetails.image,
        }}
        onSubmit={(values) => {
          img ? setImg(false) : setImg(true);
          Swal.fire({
            title: "Quieres guardar los cambios?",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed)
              adminActions.ADMupdate_product({
                ...values,
                id: productDetails.id,
                show_in_shop: values.show_in_shop === "true" ? true : false,
              });
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mx-12">
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
                  <label className="w-2 text-xl">S:</label>
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
                  <label className="w-2 text-xl">M:</label>
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
                  <label className="w-2 text-xl">L:</label>
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
                <div className="flex gap-8">
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
                </div>
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
                className="font-mono w-14"
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
            <FileUpload
              setFieldValue={setFieldValue}
              fieldName="image"
              force={img}
            />
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
                onClick={() =>
                  Swal.fire({
                    title: "Quieres eliminar el producto?",
                    showCancelButton: true,
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                  }).then((result) => {
                    if (result.isConfirmed)
                      adminActions.ADMdelete_product(productDetails.id);
                  })
                }
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
