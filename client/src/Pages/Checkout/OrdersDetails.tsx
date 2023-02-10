import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Buttons/Button/Button';

const orders = [
  {
    id: 1,
    date: '2022-01-01',
    total: 100,
    status: 'approved',
    items: [
      {
        id: 1,
        name: 'Product 1',
        price: 50,
        quantity: 2,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 25,
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    date: '2022-02-01',
    total: 200,
    items: [
      {
        id: 3,
        name: 'Product 3',
        price: 100,
        quantity: 2,
      },
      {
        id: 4,
        name: 'Product 4',
        price: 50,
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    date: '2022-03-01',
    total: 150,
    status: 'pending',
    items: [
      {
        id: 5,
        name: 'Product 5',
        price: 75,
        quantity: 2,
      },
    ],
  },
  {
    id: 4,
    date: '2022-04-01',
    total: 300,
    items: [
      {
        id: 6,
        name: 'Product 6',
        price: 150,
        quantity: 2,
      },
    ],
  },
  {
    id: 5,
    date: '2022-05-01',
    total: 175,
    items: [
      {
        id: 7,
        name: 'Product 7',
        price: 75,
        quantity: 1,
      },
      {
        id: 8,
        name: 'Product 8',
        price: 50,
        quantity: 1,
      },
      {
        id: 9,
        name: 'Product 9',
        price: 50,
        quantity: 1,
      },
    ],
  },
];

const OrderDetails = (props: any) => {
  //   const order = order || {};

  return (
    <div className='flex flex-col items-center p-1 mt-10'>
      <h1 className='text-2xl font-bold'>Detalles de la orden</h1>
      {orders.map((order) => (
        <div className='w-full md:w-2/3 lg:w-2/3 xl:w-2/4 mb-10' key={order.id}>
          <div className='bg-white p-6 shadow-lg'>
            <div className='mb-4'>
              <p className='font-bold'>ID de la orden:</p>
              <p>{order.id}</p>
            </div>
            <div className='mb-4'>
              <p className='font-bold'>Fecha de la orden:</p>
              <p>{order.date}</p>
            </div>
            <div className='mb-4'>
              <p className='font-bold text-lg'>Productos:</p>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='text-left'>Nombre</th>
                    <th className='text-center'>Precio</th>
                    <th className='text-center'>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items &&
                    order.items.map((product: any) => (
                      <tr key={product.id}>
                        <td className='text-left'>{product.name}</td>
                        <td className='text-center'>$ {product.price}</td>
                        <td className='text-center'>{product.quantity}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className='mb-4'>
              <p className='font-bold'>Total:</p>
              <p>{order.total}</p>
            </div>
            <div className='mb-4'>
              <p className='font-bold'>Estado de la orden:</p>
              <p>{order.status}</p>
            </div>
          </div>
        </div>
      ))}

      <div className='text-center'>
        <Link to='/orders'>
          <Button
            text='Volver al Home '
            name='backToHome'
            onClick={() => {}}
            disabled={false}
            type='submit'
            className={'justify-center'}
          />
        </Link>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default OrderDetails;
