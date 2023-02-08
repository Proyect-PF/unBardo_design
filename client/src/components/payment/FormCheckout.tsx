import { useFormik } from 'formik';
// import Input from '../inputs/Input';
import Button from '../Buttons/Button/Button';
import { useState } from 'react';
import { initialStateUser } from '../../utils/initialStateUser';
import axios from 'axios';
import * as Yup from 'yup';

export const FormCheckout = (): JSX.Element => {
  // const [userDataPayment, setUserDataPayment] = useState(initialStateUser);

  const formik = useFormik({
    initialValues: {
      id: 2,
      title: 'Remera blanca',
      price: 35,
      quantity: 2,

      email: 'unBardoDesign@gmail.com',
      name: '',
      surname: '',
      area_code: 11,
      number: 0,
      zip_code: 0,
      street_name: '',
      street_number: 0,
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      surname: Yup.string().required(),
      area_code: Yup.string().required(),
      number: Yup.number().required(),
      zip_code: Yup.string().required(),
      street_name: Yup.string().required(),
      street_number: Yup.number().required(),
    }),
    onSubmit: (formData) => {
      console.log(formData);
    },
  });

  // function handleChange(
  //   e: React.ChangeEvent<
  //     HTMLinputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) {
  //   e.preventDefault();
  //   setUserDataPayment({
  //     ...userDataPayment,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='mx-8 my-4 flex flex-col gap-6 justify-center align-middle'
    >
      <div>
        <label htmlFor='name'>Nombre</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Ej: Marcos'
          onChange={formik.handleChange}
          className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
        />
      </div>
      <div>
        <label htmlFor='surname'>Apellido</label>
        <input
          type='text'
          id='surname'
          name='surname'
          placeholder='Solis'
          onChange={formik.handleChange}
          className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
          onBlur={() => {}}
        />
      </div>
      <div>
        <label htmlFor='email'>email</label>
        <input
          type='text'
          id='email'
          name='email'
          placeholder=''
          onChange={formik.handleChange}
          className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
          onBlur={() => {}}
        />
      </div>
      <div className='flex flex-row pt-5 gap-5'>
        <div className='flex flex-col'>
          <label htmlFor='area_code'>Codigo de Area</label>
          <input
            type='text'
            id='area_code'
            name='area_code'
            placeholder='2954'
            onChange={formik.handleChange}
            className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
            onBlur={() => {}}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='number'>Telefono</label>
          <input
            type='text'
            id='number'
            name='number'
            placeholder='153666987'
            onChange={formik.handleChange}
            className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
            onBlur={() => {}}
          />
        </div>
      </div>
      <div>
        <label htmlFor='street_name'>Direccion</label>
        <input
          type='text'
          id='street_name'
          name='street_name'
          placeholder='San Martin'
          onChange={formik.handleChange}
          className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
          onBlur={() => {}}
        />
        <div className='flex flex-row pt-5 gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='street_number'>Numero de casa</label>
            <input
              type='text'
              id='street_number'
              name='street_number'
              placeholder='12'
              onChange={formik.handleChange}
              className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
              onBlur={() => {}}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='zip_code'>Codigo Postal</label>
            <input
              type='text'
              id='zip_code'
              name='zip_code'
              placeholder='3200'
              onChange={formik.handleChange}
              className={`text-align: first w-full h-12 pl-3 border border-gray-300 rounded-md bg-gray-50`}
              onBlur={() => {}}
            />
          </div>
        </div>
      </div>
      <Button
        text='Pagar'
        name='pagar'
        onClick={async () => {
          const checkout = await axios
            .post('http://localhost:3700/orders/payment', formik.initialValues)
            .then(
              (res) => (window.location.href = res.data.res.body.init_point)
            );
        }}
        disabled={false}
        type='submit'
      />
    </form>
  );
};
