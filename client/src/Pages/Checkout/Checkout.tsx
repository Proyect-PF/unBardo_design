import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/Buttons/Button/Button';
import CheckoutCard from '../../components/Cards/Checkout/CheckoutCard';
import { State } from '../../state/reducers';
import { useEffect } from 'react';
import { clearCheckoutList } from '../../state/action-creators';

interface ProductSize {
  [size: string]: number;
}

interface Product {
  id_product: number;
  sizes: ProductSize;
}

interface UserProducts {
  id_user: number;
  products: Product[];
}

const Checkout = (): JSX.Element => {
  const { checkoutList } = useSelector((state: State) => state.checkout);
  const { userId } = useSelector((state: State) => state.user);

  // const checkoutData = localStorage.getItem('shoppingBag');

  const userProducts: UserProducts = {
    id_user: userId,
    products: checkoutList.reduce((acc: Product[], item: any) => {
      const foundItem = acc.find((p) => p.id_product === item.id);
      if (foundItem) {
        foundItem.sizes[item.size] = (foundItem.sizes[item.size] || 0) + 1;
      } else {
        acc.push({
          id_product: parseInt(item.id.split('-')[0]),
          sizes: {
            [item.size]: item.ammount,
          },
        });
      }
      return acc;
    }, []),
  };

  useEffect(() => {
    axios
      .post('http://localhost:3700/orders', userProducts)
      .then((response) => {
        console.log('DESPUES DEL POST', response);
        return response;
      })
      .catch((error) => {
        console.error('ERROR ENVIANDO LA DATA AL SERVER:', error);
      });
  }, []);

  return (
    <div className='flex flex-col items-center'>
      {checkoutList?.length > 0 &&
        checkoutList.map((e: any) => (
          <CheckoutCard
            key={e.id}
            id={e.id}
            name={e.name}
            size={e.size}
            price={e.price}
            ammount={e.ammount}
            imgF={e.imgF}
          />
        ))}

      <p className='mx-6 font-bold text-right'>{`Total: $ ${
        checkoutList.length > 0
          ? checkoutList.reduce((acc: number, e: any) => {
              return acc + e.price * e.ammount;
            }, 0)
          : 0
      }`}</p>

      <Link to='/checkout/payment'>
        <Button
          className={'justify-center'}
          type='button'
          name='Checkout'
          text={`Pagar ahora (${
            checkoutList.length > 0
              ? checkoutList.reduce((acc: number, e: any) => {
                  return acc + e.ammount;
                }, 0)
              : 0
          })`}
          onClick={() => {}}
          // onClick={() => {}}
          disabled={checkoutList.length === 0}
        />
      </Link>
    </div>
  );
};

export default Checkout;
