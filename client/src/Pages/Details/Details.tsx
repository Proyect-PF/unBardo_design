import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import imageB from '../../assets/images/remeras/unbardo-07B.png';
//import imageF from '../../assets/images/remeras/unbardo-07F.png';
import Button from '../../components/Buttons/Button/Button';
import AmountInput from '../../components/Inputs/Amount/AmountInput';
import SizeSelector from '../../components/Inputs/SizeSelector/SizeSelector';
import { actionCreators } from '../../state';
import { State } from '../../state/reducers';

import { getItem } from '../../utils/localStorage';

const Details = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetch_product_detail } = bindActionCreators(actionCreators, dispatch);
  const { addCheckout } = bindActionCreators(actionCreators, dispatch);
  const { productDetails } = useSelector((state: State) => state.products);
  //AL: loading state for loading implementation (done)
  const [loading, setLoading] = useState(true);
  //AL: show state for changing between front / back image of the product (functional but
  // needs to be rewired to future implementation)
  const [show, setShow] = useState(false);
  //AL: size / amount state retrieve the selection for future add to cart implementation
  const [ammount, setAmmount] = useState(1);
  const [size, setSize] = useState('');

  //AL:retrieve the id from the url & transform to number to match type
  const idS = location.pathname.split('/')[2];
  const id = Number(idS);

  //AL:Same loading implementation as HOME page
  useEffect(() => {
    setLoading(true);
    fetch_product_detail(id);
  }, [dispatch, id]);

  //AL: Check if the data is correct (see getProductDetails action for context), needs to be rewired
  //  but functional for now.
  useEffect(() => {
    setLoading(true);
    !productDetails.show_in_shop && navigate('/');
    if (productDetails.name !== '') setLoading(false);
  }, [productDetails]);

  //AL: this function controll the  show state (see states for context)
  // const handleShow = (): void => {
  //   show ? setShow(false) : setShow(true);
  // };

  //AL: this function manages the add to cart functionality, needs to be implemented
  const handleCart = (e: any) => {
    e.preventDefault();
    const payload = {
      id: productDetails.id + '-' + size,
      name: productDetails.name,
      size: size,
      price: productDetails.price,
      ammount: ammount,
      imgF: productDetails.image,
    };
    addCheckout(payload);
    setSize('');
    setAmmount(1);
  };

  const stockSize = (size: string) => {

    let checkoutList = getItem("shoppingBag")
    if(size === "S") {
      if(checkoutList?.length > 0) {
        let findCard = checkoutList.find((x:any) => x.id === productDetails.id + "-S")
        if(findCard) {
          return productDetails.S - findCard.ammount
        }
      }
      return productDetails.S
    }
    if(size === "L") {
      if(checkoutList?.length > 0) {
        let findCard = checkoutList.find((x:any) => x.id === productDetails.id + "-L")
        if(findCard) {
          return productDetails.L - findCard.ammount
        }
      }
      return productDetails.L
    }
    if(size === "M") {
      if(checkoutList?.length > 0) {
        let findCard = checkoutList.find((x:any) => x.id === productDetails.id + "-M")
        if(findCard) {
          return productDetails.M - findCard.ammount
        }
      }
      return productDetails.M
    }
    if(size === "XL") {
      if(checkoutList?.length > 0) {
        let findCard = checkoutList.find((x:any) => x.id === productDetails.id + "-XL")
        if(findCard) {
          return productDetails.XL - findCard.ammount
        }
      }
      return productDetails.XL
    }

    else {
      return 1;
    }
  };

  return (
    <div>
      <div
        className={`my-8 flex justify-center ${
          !loading ? 'hidden' : 'visible'
        }`}
      >
        <div className='border-8 border-black border-solid rounded-full w-44 h-44 border-t-transparent animate-spin'></div>
      </div>
      <div
        className={`flex flex-col md:flex-row md:gap-5 ${
          loading ? 'hidden' : 'visible'
        }`}
      >
        <div className='relative'>
          <img
            className={`absolute ${show ? 'opacity-100' : 'opacity-0'}`}
            alt='black tshirt'
            src={imageB}
          />
          <img className='' alt='black tshirt' src={productDetails.image} />
          {/* <img
            className="absolute w-16 border-2 border-black left-4 top-4 z-1"
            alt="black tshirt"
            src={show ? imageF : imageB}
            onClick={handleShow}
          /> */}
        </div>
        <div className='w-4/5 mx-auto md:flex md:flex-col md:justify-between md:mt-8'>
          <div>
            <p className='mt-4 text-4xl font-bold '>{productDetails.name}</p>
            <p className='my-2 text-3xl font-bold '>{`$ ${productDetails.price}`}</p>
            <p className='my-2 text-lg italic font-medium font-poppins'>{`${productDetails.description}`}</p>
          </div>
          <div>
            <div className='flex justify-around my-8 text-lg text-center'>
              <SizeSelector
                detailId={productDetails.id}
                selected={size}
                sizes={[
                  productDetails.S,
                  productDetails.M,
                  productDetails.L,
                  productDetails.XL,
                ]}
                setter={setSize}
              />
              <AmountInput
                stock={stockSize}
                size={size}
                amount={ammount}
                setter={setAmmount}
              />
            </div>

            <div className='flex flex-col'>
              <Button
                className={'justify-center'}
                type='button'
                text='Añadir al carrito'
                onClick={handleCart}
                name='Carrito'
                disabled={size === ''}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
