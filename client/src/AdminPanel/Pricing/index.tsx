import axios from "axios";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Button from "../../components/Buttons/Button/Button";
import Input from "../../components/Inputs/Input";
import Toast from "../../components/Toast";
import { baseURL, PORT } from "../../utils/url&port";
import { ADMupdate_pricing } from "../AdminRedux/actions";

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

  return (
    <div>
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
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="mx-8 mt-16">
              <p className="mb-8 text-2xl">Tarifas de envios:</p>
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
