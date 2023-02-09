
import { Formik } from 'formik';
import Input from '../Inputs/Input';
import Button from '../Buttons/Button/Button';
import { useState } from 'react';
import { initialStateUser } from '../../utils/initialStateUser';
import axios from 'axios';

export const FormCheckout = (): JSX.Element => {
  const [userDataPayment, setUserDataPayment] = useState({
    name: 'Diego',
    surname: 'Maidana',
    email: 'diegoshhh@gmail.com',
    area_code: '2954',
    number: 23341232,
    street_name: 'San Martin',
    zip_code: '3200',
    street_number: 12,
    id: 2,
    title: 'Remera blanca',

    price: 35,
    quantity: 2,
  });

  function handleChange(e: any) {
    e.preventDefault();
    setUserDataPayment({
      ...userDataPayment,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form
      onSubmit={() => {}}

      className='mx-8 my-4 flex flex-col gap-6 justify-center align-middle'
    >
      <div>
        <label htmlFor='name'>Nombre</label>
        <Input
          type='text'
          id='name'
          name='name'
          placeholder='Ej: Marcos'
          value={userDataPayment.name}
          onChange={(e: any) => handleChange(e)}
          className=' font-poppins'

          onBlur={() => {}}
        />
      </div>
      <div>

        <label htmlFor='surname'>Apellido</label>
        <Input
          type='text'
          id='surname'
          name='surname'
          placeholder='Solis'
          value={userDataPayment.surname}
          onChange={(e: any) => handleChange(e)}
          className=' font-poppins'

          onBlur={() => {}}
        />
      </div>
      <div>

        <label htmlFor="email">email</label>
        <Input
          type="text"
          id="email"
          name="email"
          placeholder=""
          value={userDataPayment.email}
          onChange={(e: any) => handleChange(e)}
          className=" font-poppins"
          onBlur={() => {}}
        />
      </div>
      <div className="flex flex-row gap-5 pt-5">
        <div className="flex flex-col">
          <label htmlFor="area_code">Codigo de Area</label>
          <Input
            type="number"
            id="area_code"
            name="area_code"
            placeholder="2954"
            value={userDataPayment.area_code}
            onChange={(e: any) => handleChange(e)}
            className=" font-poppins"
            onBlur={() => {}}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone">Telefono</label>
          <Input
            type="number"
            id="phone"
            name="phone"
            placeholder="432234454"
            value={userDataPayment.number}
            onChange={(e: any) => handleChange(e)}
            className=" font-poppins"

            onBlur={() => {}}
          />
        </div>
      </div>
      <div>

        <label htmlFor='street_name'>Direccion</label>
        <Input
          type='text'
          id='street_name'
          name='street_name'
          placeholder='San Martin'
          value={userDataPayment.street_name}
          onChange={(e: any) => handleChange(e)}
          className=' font-poppins'
          onBlur={() => {}}
        />
        <div className='flex flex-row pt-5 gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='street_number'>Numero de casa</label>
            <Input
              type='number'
              id='street_number'
              name='street_number'
              placeholder='12'
              value={userDataPayment.street_number}
              onChange={(e: any) => handleChange(e)}
              className=' font-poppins'
              onBlur={() => {}}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='zip_code'>Codigo Postal</label>
            <Input
              type='number'
              id='zip_code'
              name='zip_code'
              placeholder='3200'
              value={userDataPayment.zip_code}
              onChange={(e: any) => handleChange(e)}
              className=' font-poppins'

              onBlur={() => {}}
            />
          </div>
        </div>
      </div>
      {/* <button
        onClick={async () => {
          const checkout = await axios
            .post('http://localhost:3700/products/payment/')
            .then(
              (res) => console.log(res.data.res.body.payer.email)
              //   (res) => (window.location.href = res.data.res.body.init_point)
            );
        }}
      > */}
      {/* Pagar */}
      {/* </button> */}
      <Button

        text='Pagar'
        name='pagar'
        onClick={async () => {
          const checkout = await axios
            .post('http://localhost:3700/orders/payment', userDataPayment)

            .then(
              // (res) => console.log(res.data.res.body.payer.email)
              (res) => (window.location.href = res.data.res.body.init_point)
            );
        }}
        disabled={false}

        type='button'

      />
    </form>
  );
};
