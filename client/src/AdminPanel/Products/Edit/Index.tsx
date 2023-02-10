import { Formik } from "formik";
import { useSelector } from "react-redux";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { State } from "../../../state/reducers";
import {
  create_product,
  delete_product,
  update_product,
} from "../../HttpRequests/Products";
import FileUpload from "../Create/FileUploader";

type Props = {
  className: string;
};

const Edit = ({ className }: Props): JSX.Element => {
  const { productDetails } = useSelector((state: State) => state.products);

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
          console.log(values);
          update_product({
            ...values,
            id: productDetails.id,
            show_in_shop: values.show_in_shop === "true" ? true : false,
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
          <form onSubmit={handleSubmit}>
            <p>{`Producto: ${productDetails.id}`}</p>
            <label>Nombre:</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder=""
              value={values.name}
              onChange={handleChange}
              className=" font-poppins"
              onBlur={handleBlur}
            />
            {errors.name && <p className="text-red-600 ">{errors.name}</p>}
            <label>Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder=""
              value={values.description}
              onChange={handleChange}
              className="w-full h-12 pl-3 border border-gray-300 rounded-md font-poppins text-align: first bg-gray-50"
              onBlur={handleBlur}
            />
            {errors.description && (
              <p className="text-red-600 ">{errors.description}</p>
            )}
            <div className="flex gap-8">
              <p>Color:</p>
              <select
                id="color"
                name="color"
                value={values.color}
                onChange={handleChange}
              >
                <option value="" disabled></option>
                <option value="white">Blanco</option>
                <option value="black">Negro</option>
              </select>
            </div>
            <p>Stock:</p>
            <div className="flex gap-8">
              <div className="flex gap-8">
                <label className="w-2">S:</label>
                <Input
                  type="number"
                  id="S"
                  name="S"
                  placeholder=""
                  value={values.S}
                  onChange={handleChange}
                  className="w-14 font-poppins"
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex gap-8">
                <label className="w-2">M:</label>
                <Input
                  type="number"
                  id="M"
                  name="M"
                  placeholder=""
                  value={values.M}
                  onChange={handleChange}
                  className="w-14 font-poppins"
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex gap-8">
                <label className="w-2">L:</label>
                <Input
                  type="number"
                  id="L"
                  name="L"
                  placeholder=""
                  value={values.L}
                  onChange={handleChange}
                  className="w-14 font-poppins"
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex gap-8">
                <label className="w-2">XL:</label>
                <Input
                  type="number"
                  id="XL"
                  name="XL"
                  placeholder=""
                  value={values.XL}
                  onChange={handleChange}
                  className="w-14 font-poppins"
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <div className="flex gap-8">
              <label className="w-4">Precio:</label>
              <Input
                type="number"
                id="price"
                name="price"
                placeholder=""
                value={values.price}
                onChange={handleChange}
                className="w-14 font-poppins"
                onBlur={handleBlur}
              />
            </div>
            <div className="flex gap-8">
              <p>Mostrar en tienda:</p>
              <select
                id="show_in_shop"
                name="show_in_shop"
                value={values.show_in_shop}
                onChange={handleChange}
              >
                <option value="" disabled></option>
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </div>
            <FileUpload setFieldValue={setFieldValue} fieldName="image" />
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
                onClick={() => delete_product(productDetails.id)}
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
