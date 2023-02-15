import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Buttons/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { State } from '../../state/reducers';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const orders = [
  {
    id: 1,
    date: '2022-01-01',
    total: 100,
    cuotes: 18,
    precio_final: 300,
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
];

const OrderDetails = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  //const { getOrderDetails } = bindActionCreators(actionCreators, dispatch);

  const searchParams = new URLSearchParams(location.search);
  const payment_id = searchParams.get('payment_id'); // 1
  const external_reference = searchParams.get('external_reference'); // 1 . /payment/feedback
  const status = searchParams.get('status');
  const paymentType = searchParams.get('payment_type');

  useEffect(() => {
    const sendDataOrder = async () => {
      axios
        .post('http://localhost:3700/orders/feedback', {
          payment_id,
          external_reference,
        })
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    };
    sendDataOrder();
  }, [payment_id, external_reference]);

  return (
    <div className='flex flex-col items-center p-1 mt-10'>
      <h1 className='text-2xl font-bold'>Detalles de la orden</h1>
      {orders.map((order) => (
        <div className='w-full md:w-2/3 lg:w-2/3 xl:w-2/4 mb-10' key={order.id}>
          <div className='bg-white p-6 shadow-lg'>
            <div className='mb-4'>
              <p className='font-bold'>ID de la orden:</p>
              <p>{external_reference}</p>
            </div>
            <div className='mb-4'>
              <p className='font-bold'>Fecha de la orden:</p>
              <p>{order.date}</p>
            </div>
            <div className='mb-4'>
              <p className='font-bold'>Fecha de la orden:</p>
              <p>{paymentType}</p>
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
              <p>$ {order.total}</p>
            </div>
            <div className='mb-4'>
              <p className='font-bold'>Cuotas:</p>
              <p>x {order.cuotes}</p>
            </div>
            <div className='mb-4'>
              <p className='font-bold'>Precio Final:</p>
              <p>${order.precio_final}</p>
            </div>
            <div className='mb-4'>
              <p className='font-bold'>Estado de la orden:</p>
              <p>{status}</p>
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
