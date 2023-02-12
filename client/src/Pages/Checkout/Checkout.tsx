import CheckoutCard from '../../components/Cards/Checkout/CheckoutCard';
import Button from '../../components/Buttons/Button/Button';
import { useSelector } from 'react-redux';
import { State } from '../../state/reducers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CircularJSON from 'circular-json';

interface ProductSize {
  [size: string]: number;
}

interface Product {
  id_product: number;
  size: ProductSize;
}

interface UserProducts {
  id_user: number;
  products: Product[];
}

const Checkout = (): JSX.Element => {
  const { checkoutList } = useSelector((state: State) => state.checkout);
  const { userId } = useSelector((state: State) => state.user);

  console.log(userId);

  const userProducts: UserProducts = {
    id_user: userId,
    products: checkoutList.reduce((acc: Product[], item: any) => {
      const foundItem = acc.find((p) => p.id_product === item.id);
      if (foundItem) {
        foundItem.size[item.size] = (foundItem.size[item.size] || 0) + 1;
      } else {
        acc.push({
          id_product: parseInt(item.id.split('-')[0]),
          size: {
            [item.size]: item.ammount,
          },
        });
      }
      return acc;
    }, []),
  };

  console.log(userProducts);

  function handleCheckout(userProducts: JSON) {
    const data = CircularJSON.stringify(userProducts);
    // console.log(data);
    axios
      .post('http://localhost:3700/orders', data)
      .then((response) => {
        console.log('Order placed successfully!', response);
      })
      .catch((error) => {
        console.error('Error placing order', error);
      });
  }

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
          onClick={handleCheckout}
          // onClick={() => {}}
          disabled={checkoutList.length === 0}
        />
      </Link>
    </div>
  );
};

export default Checkout;
