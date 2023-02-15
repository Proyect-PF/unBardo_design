import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Buttons/Button/Button';
import CheckoutCard from '../../components/Cards/Checkout/CheckoutCard';
import { State } from '../../state/reducers';
import { useEffect } from 'react';
import { clearCheckoutList } from '../../state/action-creators';
import Swal from 'sweetalert2';
import logged from "../../assets/svg/logged.svg";

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
  const navigate = useNavigate()
  const { checkoutList } = useSelector((state: State) => state.checkout);
  const { userId } = useSelector((state: State) => state.user);
  const { success } = useSelector((state: State) => state.user);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(success){
      axios
      .post('http://localhost:3700/orders', userProducts)
      .then((response) => {
        console.log('DESPUES DEL POST', response);
        return response;
      })
      .catch((error) => {
        console.error('ERROR ENVIANDO LA DATA AL SERVER:', error);
      });
      navigate('/checkout/payment')
    } else {
      Swal.fire({
        imageUrl: logged,
        title: "<p class='mt-4 text-4xl font-bold font-rift text-black'>Inicia sesión</p>",
        showCancelButton: true,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonColor: "#000",
        denyButtonColor: "#000",
        cancelButtonColor: "#e5e7eb",
        cancelButtonText: "<p class='font-rift text-lg text-black'>Por ahora no</p>",
        confirmButtonText: "<p class='font-rift text-lg'>Iniciar Sesión</p>",
        denyButtonText: "<p class='font-rift text-lg text-white'>Registrarse</p>",
        reverseButtons: true,
        html: 
        '<p class="font-poppins font-medium text-black italic" >Necesitas iniciar sesión para poder comprar los productos de la bolsa de compra</p>',
        //text: 'Necesitas iniciar sesión para poder agregar productos a la bolsa de compra',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/account/login')
        } else if (result.isDenied) {
          navigate("/account/register")
        }
      })
    }
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
          onClick={handleClick}
          // onClick={() => {}}
          disabled={checkoutList.length === 0}
        />
    </div>
  );
};

export default Checkout;
