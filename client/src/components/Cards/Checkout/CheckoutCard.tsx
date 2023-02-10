import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonSmall from '../../Buttons/ButtonSmall/ButtonSmall';

interface Props {
  id: string;
  name: string;
  size: string;
  price: number;
  ammount: number;
  imgF: string;
}

const CheckoutCard = ({
  id,
  name,
  size,
  price,
  ammount,
  imgF,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { removeCheckout } = bindActionCreators(actionCreators, dispatch);

  const handleClick = (e: any) => {
    e.preventDefault();
    removeCheckout(id);
  };

  return (
    <div className='flex justify-between pr-6 w-80 gap-2 m-4 border border-black'>
      <img src={imgF} className='w-28' />
      <div className='flex flex-col pl-4 justify-around'>
        <div className='font-semibold'>
          <Link to={`/product/${id.split('-')[0]}`}>{name}</Link>
          <p>{size}</p>
          <p>{`$ ${price * ammount}`}</p>
        </div>
        <div className='flex justify-between items-center mr-4 font-bold'>
          <p>{ammount}</p>
          <ButtonSmall
            type='button'
            text='Remover'
            onClick={handleClick}
            name='Carrito'
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
