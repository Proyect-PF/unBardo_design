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
import { Item } from '../../types/types';

const OrderDetails = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { getOrderDetails } = bindActionCreators(actionCreators, dispatch);
  const orderData = useSelector((state: State) => state.orderDetails.orderData);
  console.log(orderData);

  const searchParams = new URLSearchParams(location.search);
  const payment_id = searchParams.get('payment_id'); // 1
  const external_reference = searchParams.get('external_reference'); // 1 . /payment/feedback

  if (orderData?.date_approved) {
    const date = new Date(orderData.date_approved);
    const formattedDate = date.toLocaleString();
  }

  useEffect(() => {
    const fetchData = async () => {
      getOrderDetails(payment_id as string, external_reference as string);
    };
    fetchData();
  }, [payment_id, external_reference]);

  return (
    <div className='flex flex-col items-center p-1 mt-10'>
      <h1 className='text-2xl font-bold'>Gracias por su Compra!!</h1>
      {/* {orders.map((order) => ( */}
      <div className='w-full md:w-2/3 lg:w-2/3 xl:w-2/4 mb-10'>
        <div className='bg-white p-6 shadow-lg'>
          <div className='mb-4 flex flex-row gap-2'>
            <p className='font-bold'>Estado de la orden:</p>
            <p className='font-bold text-green-500'>{orderData?.status}</p>
          </div>

          <div className='mb-4 flex flex-row gap-2'>
            <p className='font-bold'>ID de la orden:</p>
            <p className='text-green-500 font-bold'>{external_reference}</p>
          </div>
          <div className='mb-4 flex flex-row gap-2'>
            <p className='font-bold'>Fecha de la orden:</p>
            <p>{`${
              orderData?.date_approved &&
              new Date(orderData.date_approved).toLocaleString()
            }`}</p>
          </div>

          <div className='mb-4 flex flex-col md:flex-row'>
            <div className='mb-4 flex flex-row gap-2'>
              <p className='font-bold'>Metodo de pago:</p>
              <p>{orderData?.payment_type}</p>
              <p>{orderData?.payment_method}</p>
            </div>
          </div>

          <p className='font-bold text-lg mb-4'>Detalle del pedido:</p>
          <div className='w-full'>
            <div className='w-full'>
              <div className='flex flex-row justify-between font-bold'>
                <div className='w-1/2 text-left'>Producto</div>
                <div className='w-1/4 text-center'>Precio por unidad</div>
                <div className='w-1/4 text-center'>Subtotal</div>
              </div>
              {orderData?.items &&
                orderData?.items.map((product: Item) => (
                  <div
                    className='flex flex-row justify-between items-center border-b py-2'
                    key={product.id_product}
                  >
                    <div className='w-1/2'>
                      <div className='flex flex-row gap-4'>
                        <div>
                          {product.title} x {product.quantity}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/4 text-center'>
                      $ {product?.unit_price}
                    </div>
                    <div className='w-1/4 text-center'>
                      $ {product?.unit_price * product?.quantity}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className='flex flex-row justify-end'>
            <div className='my-4 mr-1'>
              <p className='font-bold'>Total:</p>
              <p className='mr-10'>${orderData?.total_amount}</p>
            </div>
          </div>

          <div className='flex flex-row justify-between'>
            <div className='my-4'>
              <p className='font-bold'>Cuotas:</p>
              <p>x {orderData?.cuotes}</p>
            </div>
            <div className='my-4'>
              <p className='font-bold'>Precio Final:</p>
              <p className='text-green-500 font-bold mr-10'>
                ${orderData?.total_paid_amount}
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
