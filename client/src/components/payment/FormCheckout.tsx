import { Formik } from "formik";
import Button from "../Buttons/Button/Button";
import axios from "axios";
import Input from "../Inputs/Input";
import { validationSchema } from "../../utils/FormPayment/validation";
import { initialValues } from "../../utils/FormPayment/initialValues";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../state/reducers";
import { actionCreators } from "../../state";
import { bindActionCreators } from "redux";
import { PORT, baseURL } from "../../utils/url&port";

export const FormCheckout = (): JSX.Element => {
  const { userId } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const { clearCheckoutList } = bindActionCreators(actionCreators, dispatch);

  const initialValues = {
    area_code: "",
    number: "",
    zip_code: "",
    street_name: "",
    street_number: "",
    id_user: userId,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios({
          method: "post",
          url: `${baseURL}:${PORT}/orders/payment`,
          data: values,
        }).then((res) => {
          window.location.href = res.data.res.body.init_point;
          clearCheckoutList(); // Llamada a checkoutlist() después de la redirección
        });
      }}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        errors,
        touched,
        isSubmitting,
      }) => (
        <form className="flex flex-col gap-6 mx-8 my-4" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <label htmlFor="street_name">Direccion</label>
            <Input

              autocomplete='true'
              type='text'
              id='street_name'
              name='street_name'
              placeholder='San Martin'

              onChange={handleChange}
              value={values.street_name}
              className=" font-poppins"
              onBlur={() => {}}
            />
            {errors.street_name && touched.street_name && (
              <p className="text-red-600">{errors.street_name}</p>
            )}
          </div>
          <div className="flex flex-row gap-3 sm:flex-row sm:pt-5 sm:gap-5">
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="street_number">Numero de casa</label>
              <Input

                autocomplete='true'
                type='number'
                id='street_number'
                name='street_number'
                placeholder='12'

                onChange={handleChange}
                value={values.street_number}
                className={`text-align-first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
                onBlur={() => {}}
              />
              {errors.street_number && touched.street_number && (
                <p className="text-red-600">{errors.street_number}</p>
              )}
            </div>
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="zip_code">Codigo Postal</label>
              <Input

                autocomplete='true'
                type='number'
                id='zip_code'
                name='zip_code'
                placeholder='3200'

                onChange={handleChange}
                value={values.zip_code}
                className={`text-align-first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
                onBlur={() => {}}
              />
              {errors.zip_code && touched.zip_code && (
                <p className="text-red-600">{errors.zip_code}</p>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-3 sm:flex-row sm:pt-5 sm:gap-5">
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="area_code">Codigo de Area</label>
              <Input

                autocomplete='true'
                type='number'
                id='area_code'
                name='area_code'
                placeholder='2954'

                onChange={handleChange}
                value={values.area_code}
                className={`text-align-first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
                onBlur={() => {}}
              />
              {errors.area_code && touched.area_code && (
                <p className="text-red-600">{errors.area_code}</p>
              )}
            </div>
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="number">Telefono</label>
              <Input

                autocomplete='true'
                type='number'
                id='number'
                name='number'
                placeholder='153666987'

                onChange={handleChange}
                value={values.number}
                className={`text-align-first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
                onBlur={() => {}}
              />
              {errors.number && touched.number && (
                <p className="text-red-600">{errors.number}</p>
              )}
            </div>
          </div>

          <Button
            text="Pagar"
            name="pagar"
            onClick={() => {}}
            disabled={isSubmitting}
            type="submit"
            className={"justify-center"}
          />
        </form>
      )}
    </Formik>
  );
};

// payment_id: feedback.payment_id,
// status: feedback.status,
// external_reference: feedback.external_reference,
// items: payment_detail.data.additional_info.items,
// payment_method: payment_detail.data.payment_method_id,
// payment_type: payment_detail.data.payment_type_id,
// total_amount: payment_detail.data.transaction_amount,
// cuotes: payment_detail.data.installments,
// total_paid_amount: payment_detail.data.transaction_details.total_paid_amount,
// orderAproved,

// Status: "approved",                 1
// external_reference: 48,           1
// items: [
//     {
//       quantity: 2,                1
//       title: "Remera negra",        1
//       unit_price: 5000 .          1
//     }
// ],
// payment_method: "master",         1
// payment_type: "credit_card",      1
// total_amount: 10000,              1
// cuotes: 18,                       1
// total_paid_amount: 26530,         1

// const payment_detail = await axios.get(https://api.mercadopago.com/v1/payments/${feedback.payment_id},
//     {
//         headers: {
//             "Content-types": "application/json",
//             Authorization: Bearer ${process.env.MERCADOPAGO_KEY}
//         },
//     });
