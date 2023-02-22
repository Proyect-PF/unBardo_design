import { Formik } from 'formik';
import Button from '../Buttons/Button/Button';
import axios from 'axios';
import Input from '../Inputs/Input';
import Swal from 'sweetalert2';
import { validationSchema } from '../../utils/FormPayment/validation';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../state/reducers';
import { actionCreators } from '../../state';
import { bindActionCreators } from 'redux';
import { PORT, baseURL } from '../../utils/url&port';
import { useState } from 'react';

export const FormCheckout = (): JSX.Element => {
  const { userId } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const { clearCheckoutList } = bindActionCreators(actionCreators, dispatch);
  const [isUpdateExecuted, setIsUpdateExecuted] = useState(false);
  const [distance, setDistance] = useState('');
  const [city, setCity] = useState('');
  const [shipmentCost, setShipmentCost] = useState('');

  const initialValues = {
    area_code: '',
    number: '',
    zip_code: '',
    street_name: '',
    street_number: '',
    shipmentCost: '',
    id_user: userId,
  };

  const handleUpdate = async (values: any) => {
    try {
      const response = await axios.get(
        `${baseURL}/shipments/distance?zip_code=${values.zip_code}`
      );
      setDistance(response.data.distance);
      setCity(response.data.city);
      setShipmentCost(response.data.shipmentCost);
      setIsUpdateExecuted(true);
    } catch (error) {
      console.log(error);
      setIsUpdateExecuted(false);
      Swal.fire({
        title: 'Error',
        text: 'El codigo postal no existe',
        // icon: 'error',
        confirmButtonColor: '#376B7E',
        denyButtonColor: '#376B7E',
        cancelButtonColor: '#e5e7eb',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios({
          method: 'post',

          url: `${baseURL}/orders/payment`,
          data: {
            ...values,
            shipmentCost: shipmentCost,
          },

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
        <form className='flex flex-col gap-6 mx-8 my-4' onSubmit={handleSubmit}>
          <div className='flex flex-col w-full'>
            <label htmlFor='street_name'>Direccion</label>
            <Input
              autocomplete='true'
              type='text'
              id='street_name'
              name='street_name'
              placeholder='San Martin'
              onChange={handleChange}
              value={values.street_name}
              className=' font-poppins'
              onBlur={() => {}}
            />
            {errors.street_name && touched.street_name && (
              <p className='text-red-600'>{errors.street_name}</p>
            )}
          </div>
          <div className='flex flex-row gap-3 sm:flex-row sm:pt-5 sm:gap-5'>
            <div className='flex flex-col w-full sm:w-1/2'>
              <label htmlFor='street_number'>Numero de casa</label>
              <Input
                min={0}
                max={9999}
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
                <p className='text-red-600'>{errors.street_number}</p>
              )}
            </div>
            <div className='flex flex-col w-full sm:w-1/2'>
              <label htmlFor='zip_code'>Codigo Postal</label>
              <Input
                min={0}
                max={9999}
                autocomplete='true'
                type='text'
                id='zip_code'
                name='zip_code'
                placeholder='3200'
                maxLength={6}
                onChange={(e: any) => {
                  const value = e.target.value;
                  if (value.length <= 6) {
                    handleChange(e);
                  }
                }}
                value={values.zip_code}
                className={`text-align-first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
                onBlur={() => {}}
              />

              {errors.zip_code && touched.zip_code && (
                <p className='text-red-600'>{errors.zip_code}</p>
              )}
              {city && (
                <p className='mt-2 text-sm bg-gray-100 rounded-md py-1 px-2'>
                  Ciudad: {city}
                </p>
              )}
              {shipmentCost && (
                <p className='mt-2 text-sm bg-gray-100 rounded-md py-1 px-2'>
                  Costo de envío: $ {parseFloat(shipmentCost).toFixed(2)}
                </p>
              )}
              <button
                type='button'
                className='mt-2 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700  hover:bg-black hover:text-white'
                onClick={() => handleUpdate(values)}
              >
                Calcular Envio
              </button>
            </div>
          </div>

          <div className='flex flex-row gap-3 sm:flex-row sm:pt-5 sm:gap-5'>
            <div className='flex flex-col w-full sm:w-1/2'>
              <label htmlFor='area_code'>Codigo de Area</label>
              <input
                type='text'
                id='area_code'
                name='area_code'
                placeholder='2954'
                maxLength={5}
                onChange={(e: any) => {
                  const value = e.target.value;
                  // Validar que solo se ingresen números
                  const regex = /^[0-9]*$/;
                  if (regex.test(value) && value.length <= 5) {
                    handleChange(e);
                  }
                }}
                value={values.area_code}
                className={`text-align-first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
                onBlur={() => {}}
              />
              {errors.area_code && touched.area_code && (
                <p className='text-red-600'>{errors.area_code}</p>
              )}
            </div>
            <div className='flex flex-col w-full sm:w-1/2'>
              <label htmlFor='number'>Telefono</label>
              <Input
                min={6}
                max={999999999}
                autocomplete='true'
                type='number'
                id='number'
                name='number'
                placeholder='153666987'
                maxLength={9}
                onChange={(e: any) => {
                  const value = e.target.value;
                  if (value.length <= 9) {
                    handleChange(e);
                  }
                }}
                value={values.number}
                className={`text-align-first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
                onBlur={() => {}}
              />
              {errors.number && touched.number && (
                <p className='text-red-600'>{errors.number}</p>
              )}
            </div>
          </div>

          <Button
            text='Pagar'
            name='pagar'
            onClick={() => {}}
            disabled={!isUpdateExecuted}
            type='submit'
            className={`justify-center ${
              isSubmitting || errors.number || !isUpdateExecuted
                ? 'cursor-not-allowed'
                : 'text-black'
            }`}
          />
        </form>
      )}
    </Formik>
  );
};
