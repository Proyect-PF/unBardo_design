import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Buttons/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { State } from '../../state/reducers';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Item } from '../../state/types/index';

const OrderDetails = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  //const { getOrderDetails } = bindActionCreators(actionCreators, dispatch);
  const [orderData, setOrderData] = useState({
    status: '',
    external_reference: '',
    items: [],
    payment_method: '',
    payment_type: '',
    total_amount: 0,
    cuotes: 0,
    total_paid_amount: 0,
  });

  const searchParams = new URLSearchParams(location.search);
  const payment_id = searchParams.get('payment_id'); // 1
  const external_reference = searchParams.get('external_reference'); // 1 . /payment/feedback

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3700/orders/feedback',
          {
            payment_id,
            external_reference,
          }
        );
        setOrderData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [payment_id, external_reference]);
  // console.log(orderData.);

  return (
    <div className='flex flex-col items-center p-1 mt-10'>
      <h1 className='text-2xl font-bold'>Gracias por su Compra!!</h1>
      {/* {orders.map((order) => ( */}
      <div className='w-full md:w-2/3 lg:w-2/3 xl:w-2/4 mb-10'>
        <div className='bg-white p-6 shadow-lg'>
          <div className='mb-4 flex flex-row gap-2'>
            <p className='font-bold'>Estado de la orden:</p>
            <p className='font-bold text-green-500'>{orderData.status}</p>
          </div>

          <div className='mb-4 flex flex-row gap-2'>
            <p className='font-bold'>ID de la orden:</p>
            <p className='text-green-500 font-bold'>{external_reference}</p>
          </div>
          <div className='mb-4 flex flex-row gap-2'>
            <p className='font-bold'>Fecha de la orden:</p>
            <p>20/12/2023</p>
          </div>

          <div className='mb-4 flex flex-col md:flex-row'>
            <div className='mb-4 flex flex-row gap-2'>
              <p className='font-bold'>Metodo de pago:</p>
              <p>{orderData.payment_type}</p>
              <p>{orderData.payment_method}</p>
            </div>
          </div>

          <p className='font-bold text-lg mb-4'>Detalle del pedido:</p>
          <div className='w-full'>
            <table className='table-auto w-full'>
              <thead className='w-full'>
                <tr className='flex flex-row justify-between justify-start'>
                  <th className='text-center'>Producto</th>
                  <div className='flex flex-row justify-between w-1/2'>
                    <th className='text-center'>Precio por unidad</th>
                    <th className='text-center mr-5'>Subtotal</th>
                  </div>
                </tr>
              </thead>
              <tbody className='w-full'>
                {orderData.items &&
                  orderData.items.map((product: Item) => (
                    <tr className='w-full' key={product.id}>
                      <div className='flex flex-row justify-between'>
                        <td className='text-center flex flex-row gap-4'>
                          {product.title} x {product.quantity}
                        </td>
                        <div className='flex flex-row justify-between w-1/2'>
                          <td className='text-center'>
                            $ {product.unit_price}
                          </td>
                          <td className='text-center mr-9'>
                            $ {product.unit_price * product.quantity}
                          </td>
                        </div>
                      </div>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className='flex flex-row justify-end'>
            <div className='my-4 mr-1'>
              <p className='font-bold'>Total:</p>
              <p className='mr-8'>${orderData.total_amount}</p>
            </div>
          </div>

          <div className='flex flex-row justify-between'>
            <div className='my-4'>
              <p className='font-bold'>Cuotas:</p>
              <p>x {orderData.cuotes}</p>
            </div>
            <div className='my-4'>
              <p className='font-bold'>Precio Final:</p>
              <p className='text-green-500 font-bold mr-8'>
                ${orderData.total_paid_amount}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ))} */}
      <div>
        <div className='text-center'>
          <Link to='/'>
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
      </div>{' '}
    </div>
    // </div>
  );
};

export default OrderDetails;
