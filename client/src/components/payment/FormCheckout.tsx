import { Formik } from 'formik';
import Button from '../Buttons/Button/Button';
import axios from 'axios';
import Input from '../Inputs/Input';
import { validationSchema } from '../../utils/FormPayment/validation';
import { initialValues } from '../../utils/FormPayment/initialValues';
import { useSelector } from 'react-redux';
import { State } from '../../state/reducers';

export const FormCheckout = (): JSX.Element => {
  const { checkoutList } = useSelector((state: State) => state.checkout);

  const products =
    checkoutList && checkoutList.length > 0
      ? checkoutList.map((product: any) => {
          if (typeof product.id === 'string') {
            return {
              id_product: parseInt(product.id.split('-')[0], 10) || 0,
            };
          }
          return {};
        })
      : [];

  const initialValues = {
    products,

    area_code: '',
    number: '',
    zip_code: '',
    street_name: '',
    street_number: '',
    email: 'correo@correo.com',
    name: 'cliente',
    surname: 'Falso',
  };

  const handleCheckout = async () => {
    try {
      checkoutList.forEach(async (product: any) => {
        await axios.post('http://localhost:3700/orders/payment/', {
          id: product.id,
        });
      });
      console.log(checkoutList);
    } catch (error) {
      console.error(error);
      console.log(
        "La ruta '/api/checkout/' AUN NO EXISTE. Por favor, inténtelo más tarde."
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios({
          method: 'post',
          url: 'http://localhost:3700/orders/payment',
          data: values,
        }).then();
        console.log(values);
        //(res) => (window.location.href = res.data.res.body.init_point)
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
                <p className='text-red-600'>{errors.zip_code}</p>
              )}
            </div>
          </div>

          <div className='flex flex-row gap-3 sm:flex-row sm:pt-5 sm:gap-5'>
            <div className='flex flex-col w-full sm:w-1/2'>
              <label htmlFor='area_code'>Codigo de Area</label>
              <Input
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
                <p className='text-red-600'>{errors.area_code}</p>
              )}
            </div>
            <div className='flex flex-col w-full sm:w-1/2'>
              <label htmlFor='number'>Telefono</label>
              <Input
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
                <p className='text-red-600'>{errors.number}</p>
              )}
            </div>
          </div>

          <Button
            text='Pagar'
            name='pagar'
            onClick={() => {}}
            disabled={isSubmitting}
            type='submit'
            className={'justify-center'}
          />
        </form>
      )}
    </Formik>
  );
};
