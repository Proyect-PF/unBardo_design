import { Formik } from "formik";
import Button from "../../../components/Buttons/Button/Button";
import Input from "../../../components/Inputs/Input";
import { create_product } from "../../HttpRequests/Products";
import FileUpload from "./FileUploader";

type Props = {
  className: string;
};

const Create = ({ className }: Props): JSX.Element => {
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
          XL: 0,
          price: 0,
          show_in_shop: "true",
          image: "",
        }}
        onSubmit={(values) => {
          create_product({
            ...values,
            show_in_shop: Boolean(values.show_in_shop),
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
            <Button
              text="Crear"
              name="createProd"
              onClick={handleSubmit}
              disabled={false}
              type="button"
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
