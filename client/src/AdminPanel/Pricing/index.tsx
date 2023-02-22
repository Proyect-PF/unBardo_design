import axios from "axios";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";
import Toast from "../../components/Toast";
import { baseURL, PORT } from "../../utils/url&port";
import { ADMupdate_pricing } from "../AdminRedux/actions";
import * as Yup from "yup";

const Pricing = () => {
  const [pricing, setPricing] = useState({
    minus100: 0,
    minus500: 0,
    minus1000: 0,
    plus1000: 0,
  });

  useEffect(() => {
    axios.get(`${baseURL}/shipments`).then((res) => {
      setPricing({
        minus100: res.data[0].minus100,
        minus500: res.data[0].minus500,
        minus1000: res.data[0].minus1000,
        plus1000: res.data[0].plus1000,
      });
    });
  }, []);

  const pricingSchema = Yup.object().shape({
    minus100: Yup.string()
      .required("Precio es requerido")
      .min(0, "Precio debe ser mayor a 0")
      .matches(/^[0-9]+$/, "El Precio solo puede contener números"),
    minus500: Yup.string()
      .required("Precio es requerido")
      .min(0, "Precio debe ser mayor a 0")
      .matches(/^[0-9]+$/, "El Precio solo puede contener números"),
    minus1000: Yup.string()
      .required("Precio es requerido")
      .min(0, "Precio debe ser mayor a 0")
      .matches(/^[0-9]+$/, "El Precio solo puede contener números"),
    plus1000: Yup.string()
      .required("Precio es requerido")
      .min(0, "Precio debe ser mayor a 0")
      .matches(/^[0-9]+$/, "El Precio solo puede contener números"),
  });

  return (
    <div className="p-8 m-10 border shadow-xl shadow-slate-400 rounded-2xl">
      {pricing.minus100 > 0 && (
        <Formik
          initialValues={{
            minus100: pricing.minus100,
            minus500: pricing.minus500,
            minus1000: pricing.minus1000,
            plus1000: pricing.plus1000,
          }}
          onSubmit={(values) => {
            ADMupdate_pricing(
              values.minus100,
              values.minus500,
              values.minus1000,
              values.plus1000,
              Toast
            );
          }}
          validationSchema={pricingSchema}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            errors,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="">
              <p className="mb-8 text-2xl font-semibold">Tarifas de envios:</p>
              <div className="text-lg">
                <div className="flex flex-row gap-4">
                  <p className="w-60">Menos de 100km:</p>
                  <Input
                    id="minus100"
                    name="minus100"
                    type="number"
                    placeholder="..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-40"
                    value={values.minus100}
                  />
                  {errors.minus100 && touched.minus100 && (
                    <p className="text-red-600">{errors.minus100}</p>
                  )}
                </div>
                <div className="flex flex-row gap-4">
                  <p className="w-60">Menos de 500km:</p>
                  <Input
                    id="minus500"
                    name="minus500"
                    type="number"
                    placeholder="..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-40"
                    value={values.minus500}
                  />
                  {errors.minus500 && touched.minus500 && (
                    <p className="text-red-600">{errors.minus500}</p>
                  )}
                </div>
                <div className="flex flex-row gap-4">
                  <p className="w-60">Menos de 1000km:</p>
                  <Input
                    id="minus1000"
                    name="minus1000"
                    type="number"
                    placeholder="..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-40"
                    value={values.minus1000}
                  />
                  {errors.minus1000 && touched.minus1000 && (
                    <p className="text-red-600">{errors.minus1000}</p>
                  )}
                </div>
                <div className="flex flex-row gap-4">
                  <p className="w-60">Mas de 1000km:</p>
                  <Input
                    id="plus1000"
                    name="plus1000"
                    type="number"
                    placeholder="..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-40"
                    value={values.plus1000}
                  />
                  {errors.plus1000 && touched.plus1000 && (
                    <p className="text-red-600">{errors.plus1000}</p>
                  )}
                </div>
              </div>
              <Button
                text="Guardar"
                name="SavePricing"
                onClick={handleSubmit}
                type="button"
                disabled={false}
                className="justify-center"
              />
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Pricing;
