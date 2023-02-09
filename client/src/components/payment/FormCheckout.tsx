import { useFormik } from 'formik';
import { Formik } from 'formik';
import Button from '../Buttons/Button/Button';
import axios from 'axios';
import * as Yup from 'yup';
import Input from '../Inputs/Input';
import { useState } from 'react';

export const FormCheckout = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nombre es requerido')
      .min(2, 'Debe tener al menos 2 caracteres'),
    surname: Yup.string()
      .required('Apellido es requerido')
      .min(2, 'Debe tener al menos 2 caracteres'),
    email: Yup.string()
      .email('Ingrese un email válido')
      .required('Email es requerido'),
    area_code: Yup.string()
      .required('Código de área es requerido')
      .min(2, 'Debe tener al menos 2 caracteres'),
    street_name: Yup.string()
      .required('Direccion es requerida')
      .min(2, 'Debe tener al menos 2 caracter'),
    street_number: Yup.string()
      .required('El numero es requerido')
      .min(1, 'Debe tener al menos 1 caracter'),
    number: Yup.string()
      .required('Número es requerido')
      .min(6, 'Debe tener al menos 6 caracteres'),
    zip_code: Yup.string()
      .required('Código postal es requerido')
      .min(4, 'Debe tener al menos 4 caracteres'),
  });

  return (
    <Formik
      initialValues={{
        id: 2,
        title: 'Remera blanca',
        price: 35,
        quantity: 2,

        area_code: '',
        number: '',
        zip_code: '',
        street_name: '',
        street_number: '',
        email: '',
        name: '',
        surname: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios({
          method: 'post',
          url: 'http://localhost:3700/orders/payment',
          data: values,
        }).then((res) => (window.location.href = res.data.res.body.init_point));
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
        <form className='mx-8 my-4 flex flex-col gap-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Nombre</label>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='Ej: Marcos'
              onChange={handleChange}
              value={values.name}
              className=' font-poppins'
              onBlur={() => {}}
            />
            {/* && touched.name */}
            {errors.name && touched.name && (
              <p className='text-red-600'>{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor='surname'>Apellido</label>
            <Input
              type='text'
              id='surname'
              name='surname'
              placeholder='Solis'
              onChange={handleChange}
              value={values.surname}
              className=' font-poppins'
              onBlur={() => {}}
            />
            {errors.surname && touched.surname && (
              <p className='text-red-600'>{errors.surname}</p>
            )}
          </div>
          <div>
            <label htmlFor='email'>email</label>
            <Input
              type='text'
              id='email'
              name='email'
              placeholder='correo@gmail.com'
              onChange={handleChange}
              value={values.email}
              className=' font-poppins'
              onBlur={() => {}}
            />
            {errors.email && touched.email && (
              <p className='text-red-600'>{errors.email}</p>
            )}
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
          <Button
            text='Pagar'
            name='pagar'
            onClick={() => setShowModal(true)}
            disabled={isSubmitting}
            // Object.values(errors).some((error) => error) ||
            // Object.values(values).some((value) => !value)
            type='submit'
          />
        </form>
      )}
    </Formik>
  );
};
