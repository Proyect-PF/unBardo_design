import { getItem, setItem } from '../../utils/localStorage';
import { ActionType } from '../action-types';
import { ActionCheckout } from '../actions';
import { Checkout, CheckoutState } from '../types';

const initialState: CheckoutState = {
  checkoutList: Array.isArray(getItem('shoppingBag'))
    ? getItem('shoppingBag')
    : [],
};

const checkoutReducer = (state = initialState, action: ActionCheckout) => {
  switch (action.type) {
    case ActionType.ADD_CHECKOUT:
      let card: Checkout = action.payload;
      let newCard: Checkout[] = [...state.checkoutList, card];
      let findCard = state.checkoutList.findIndex(
        (x) => x.id === action.payload.id
      ); //busco si hay una card igual en el carrito
      let update: Checkout[] = []; //variable auxiliar en caso de que exista otra card igual
      if (findCard >= 0) {
        // si encuentra una card
        update = state.checkoutList; // copio el estado
        update[findCard].ammount += action.payload.ammount; // le sumo el amount del payload al de la card existente
      }
      setItem('shoppingBag', findCard === -1 ? newCard : update);
      return {
        ...state,
        checkoutList: getItem('shoppingBag'),
      };
    case ActionType.REMOVE_CHECKOUT:
      let filterList = state.checkoutList.filter(
        (x) => x.id !== action.payload
      );
      setItem('shoppingBag', filterList);
      return {
        ...state,
        checkoutList: getItem('shoppingBag'),
      };
    case ActionType.CLEAR_CHECKOUT_LIST:
      setItem('shoppingBag', []);
      return {
        ...state,
        checkoutList: [],
      };
    default:
      return { ...state };
  }
};

export default checkoutReducer;
